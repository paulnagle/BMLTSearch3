import { Component, NgZone, OnDestroy } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ModalController } from '@ionic/angular';
import { MeetingListService } from '../../services/meeting-list.service';
import { LoadingService } from '../../services/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalPage } from '../modal/modal.page';
import { Geolocation } from '@capacitor/geolocation';
import { GeocodeService } from '../../services/geocode.service'
import { CameraConfig, CameraIdleCallbackData, LatLng, Point, Size } from '@capacitor/google-maps/dist/typings/definitions';

declare const google: any;

// Define our own interface to match what the API actually returns
interface PlaceSuggestion {
  description: string;
  place_id: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
}
@Component({
    selector: 'app-map-search',
    templateUrl: './map-search.page.html',
    styleUrls: ['./map-search.page.scss'],
    standalone: false
})
export class MapSearchPage implements OnDestroy {

  performSearch: boolean = true;

  map!: GoogleMap ;
  addressLatitude: any;
  addressLongitude: any;
  loader!: Promise<void> | Promise<boolean> | null;
  isLoaded = false;

  autocompleteItems: PlaceSuggestion[] = [];
  autocomplete: { input: string; } = {input: ''};
  language: string = 'en';
  sessionToken: any;

  mapRadius!: Number;
  currentMeetings!: [];
  currentMarkerList!: Marker[];
  currentMarkerIDs: string[] = [];

  ids!: string;
  meeting!: any;
  data!: any;

  debounceTimestamp: number = 0;

  constructor(
    private translate: TranslateService, 
    private storage: StorageService, 
    private loaderCtrl: LoadingService, 
    private GeocodeService: GeocodeService,
    private meetingListService: MeetingListService,
    private modalCtrl: ModalController,
    private zone: NgZone) {

    }
      
  ngOnDestroy() {
    this.map.removeAllMapListeners();
    this.map.destroy();
    this.currentMarkerIDs = [];
    this.currentMarkerList = [];
    this.currentMeetings = [];
    // this.map = null;
  }

  async ionViewDidEnter() {
    // Using the new AutocompleteSuggestion API
    this.sessionToken = new google.maps.places.AutocompleteSessionToken();

    this.storage.get('language').then(langValue => {
      if (langValue) {
        this.language = langValue;
        this.storage.get('savedAddressLat').then(value => {
          if (value) {
            this.addressLatitude = value;
            this.storage.get('savedAddressLng').then(value => {
              if (value) {
                this.addressLongitude = value;
                setTimeout(async () => {
                  await this.createMap();
                }, 500);
              } else {
                console.log('No saved location values found');
              }
            });
          } else {
            this.locatePhone();
            setTimeout(async () => {
              await this.createMap();
            }, 500);
          }
        });
      } else {
        this.language = 'en';
        setTimeout(async () => {
          await this.createMap();
        }, 500);
      }
    });
  }


  async locatePhone() {
    this.translate.get('LOCATING').subscribe(value => { this.presentLoader(value); });
    Geolocation.getCurrentPosition().then((resp) => {
      this.addressLatitude = resp.coords.latitude;
      this.addressLongitude = resp.coords.longitude;

      this.storage.set('savedAddressLat', this.addressLatitude);
      this.storage.set('savedAddressLng', this.addressLongitude);
      this.dismissLoader();

    }).catch((error) => {
      console.log('Error getting location', error);
      this.dismissLoader();
    });
  }


  async createMap(): Promise<void> {
    const mapRef: HTMLElement = document.getElementById('map')!;

    let mapLatitude: any = 34.2359855;
    let mapLongitude: any = -118.5656689;
    if (this.addressLatitude) { mapLatitude = this.addressLatitude }
    if (this.addressLongitude) { mapLongitude = this.addressLongitude}
    let currentLatLng: LatLng = { lat: mapLatitude, lng: mapLongitude }

    const mapArgs = {
      id: 'google-map',
      element: mapRef,
      apiKey: 'AIzaSyAtwUjsIB14f0aHgdLk_JYnUrI0jvczMXw',
      forceCreate: true,
      language: this.language,
      config: {
        center: currentLatLng,
        zoom: 8
      }
    }

    await GoogleMap.create(mapArgs).then(map => {
      this.map = map;

      this.map.setOnCameraIdleListener((event) => {
        if (this.performSearch === false) {
          this.performSearch = true;
          return;
        }
        if (event.zoom <=7) {
          let cameraConfig: CameraConfig = {zoom: 8}
          this.map.setCamera(cameraConfig);
          this.performSearch = false;
          return;
        }

        this.translate.get('FINDING_MTGS').subscribe(value => {
          this.presentLoader(value);
        });

        let mapRadiusMeters = google.maps.geometry.spherical.computeDistanceBetween(event.bounds.center,event.bounds.southwest);
        this.mapRadius = Math.ceil(Number(mapRadiusMeters)/1000);

        if (this.currentMarkerIDs.length > 0) {
          this.map.removeMarkers(this.currentMarkerIDs).then(result => {
            this.currentMarkerIDs = []
            this.map.disableClustering().then(clusteringDisabled => {
              this.getMeetings(event);
            });
          });
        } else {
          this.getMeetings(event);
        }
      });  // setOnCameraIdleListener

      this.map.setOnMarkerClickListener((event) => {
        this.performSearch = false
        this.openMeetingModal(event.title)
      }); // setOnMarkerClickListener

      this.map.setOnBoundsChangedListener(event => {
      }); // setOnBoundsChangedListener

    }); // create map
  }


  getMeetings(event: CameraIdleCallbackData) {
    const timeCheck = Date.now() - this.debounceTimestamp

    if (( timeCheck < 1000 ) && (this.debounceTimestamp != 0)) {
      this.dismissLoader()
      this.debounceTimestamp = Date.now()
      return
    }
    this.debounceTimestamp = Date.now()

    this.currentMarkerList = []
    this.meetingListService.getRadiusMeetings(event.bounds.center.lat, event.bounds.center.lng, this.mapRadius).then(meetingList => {

      // Empty result set edge case
      if (meetingList.data =='{}') {
        meetingList.data = []
      }

      meetingList.data = meetingList.data.filter((meeting: { latitude: any }) => meeting.latitude = parseFloat(meeting.latitude));
      meetingList.data = meetingList.data.filter((meeting: { longitude: any }) => meeting.longitude = parseFloat(meeting.longitude));
      this.currentMeetings = meetingList.data

      for (let i = 0; i < this.currentMeetings.length; i++) {
        let meeting: any = this.currentMeetings[i];
        if (i === this.currentMeetings.length - 1) {
          this.pushStandaloneMeetingMarker(meeting);
          this.dismissLoader()
        } else {

          let currentMeetingLatLng: LatLng = {
            lat: meeting['latitude'], 
            lng: meeting['longitude']
          }
          let nextMeetingLatlng: LatLng = {
            lat:this.currentMeetings[i + 1]['latitude'],
            lng:this.currentMeetings[i + 1]['longitude'],
          }

          if (!this.meetingsAreCoLocated(currentMeetingLatLng, nextMeetingLatlng)) {
            this.pushStandaloneMeetingMarker(meeting)
          } else {
            // We have the start of some co-located meetings on the list
            this.ids = this.currentMeetings[i]['id_bigint'];
            do {
              this.ids += '&meeting_ids[]=' + this.currentMeetings[i + 1]['id_bigint'];
              let markerLatLng: LatLng = {lat: Number(meeting['latitude']), lng: Number(meeting['longitude'])}
              this.data = {
                coordinate: markerLatLng,
                title: this.ids,
                iconUrl: 'assets/markercluster/MarkerRed.png',
                iconAnchor: { x: 29, y: 100 }
              };
              
              i++;

              if (i === (this.currentMeetings.length - 1)) {
                break
              }
              let currentMeetingLatLng: LatLng = {lat:this.currentMeetings[i]['latitude'],lng:this.currentMeetings[i]['longitude']}
              let nextNextMeetingLatlng: LatLng = {lat:this.currentMeetings[i + 1]['latitude'],lng:this.currentMeetings[i + 1]['longitude']}

            } while (this.meetingsAreCoLocated(
              {lat:this.currentMeetings[i]['latitude'],lng:this.currentMeetings[i]['longitude']}, 
              {lat:this.currentMeetings[i+1]['latitude'],lng:this.currentMeetings[i+1]['longitude']}
              ));
 
            this.currentMarkerList.push(this.data);
          }
        }
      }
      this.addMarkers();
    });
  }


  addMarkers() {
    if (this.currentMarkerList.length > 0) {
      this.map.addMarkers(this.currentMarkerList).then(markerIDs => {
        this.currentMarkerIDs = markerIDs;
        this.map.enableClustering().then(clusteringEnabled => {
          this.dismissLoader()
        });
      });
    } else {
      this.dismissLoader()
    }
  }


  meetingsAreCoLocated(i: LatLng, j: LatLng) {
    let areColocated = false;
    if (((Math.round(i.lat * 1000) / 1000) !== (Math.round(j.lat * 1000) / 1000)) ||
      ((Math.round(i.lng * 1000) / 1000) !== (Math.round(j.lng * 1000) / 1000))) {
      areColocated = false;
    } else {
      areColocated = true;
    }
    return areColocated;
  }


  pushStandaloneMeetingMarker(meeting: any) {
    let markerLatLng: LatLng = {lat: Number(meeting['latitude']), lng: Number(meeting['longitude'])}
    this.data = {
      coordinate: markerLatLng,
      title: meeting['id_bigint'],
      iconUrl: 'assets/markercluster/MarkerBlue.png',
      iconAnchor: {
        x: 29,
        y: 100,
      }
    };
    this.currentMarkerList.push(this.data);
  }


  selectSearchResult(item: PlaceSuggestion) {
    this.autocompleteItems = [];
    this.autocomplete.input = item.description;

    // Get the place ID from the suggestion
    const placeId = item.place_id;
    
    if (placeId) {
      this.translate.get('LOCATING').subscribe(value => { this.presentLoader(value); });
      
      // Using the new Place API instead of PlacesService
      // Create a new Place instance with the place ID
      const place = new google.maps.places.Place({
        id: placeId,
        requestedLanguage: this.language
      });
      
      // Fetch the place details
      place.fetchFields({fields: ['location']})
        .then(() => {
          // After fetching, access the location directly from the place object
          if (place.location) {
            try {
              // Check if location.lat and location.lng are functions
              if (typeof place.location.lat === 'function' && typeof place.location.lng === 'function') {
                this.addressLatitude = place.location.lat();
                this.addressLongitude = place.location.lng();
              } else {
                // Otherwise treat them as properties
                this.addressLatitude = Number(place.location.lat);
                this.addressLongitude = Number(place.location.lng);
              }
              
              console.log('Location found:', this.addressLatitude, this.addressLongitude);
              
              this.dismissLoader();
              
              // Check if coordinates are valid numbers before setting camera
              if (!isNaN(this.addressLatitude) && !isNaN(this.addressLongitude) &&
                  isFinite(this.addressLatitude) && isFinite(this.addressLongitude)) {
                this.map.setCamera({
                  coordinate: {
                    lat: this.addressLatitude,
                    lng: this.addressLongitude,
                  },
                  zoom: 10
                });
              } else {
                console.error('Invalid coordinates:', this.addressLatitude, this.addressLongitude);
                // Fallback to geocoding if coordinates are invalid
                this.geocodeAddress(item.description);
              }
            } catch (error) {
              console.error('Error processing location:', error);
              // Fallback to geocoding
              this.geocodeAddress(item.description);
            }
          } else {
            // Fallback to geocoding if place details fails
            this.geocodeAddress(item.description);
          }
          
          // Create a new session token for the next search
          this.sessionToken = new google.maps.places.AutocompleteSessionToken();
        })
        .catch((error: Error) => {
          console.error('Error fetching place details:', error);
          
          // Log additional debugging information
          console.log('Place ID:', placeId);
          console.log('Item description:', item.description);
          
          // Fallback to geocoding if place details fails
          this.geocodeAddress(item.description);
          
          // Create a new session token for the next search
          this.sessionToken = new google.maps.places.AutocompleteSessionToken();
        });
    } else {
      // Fallback to geocoding if no place_id is available
      this.geocodeAddress(item.description);
    }
  }
  
  geocodeAddress(address: string) {
    this.GeocodeService.convertAddress(address).subscribe((geocode_reponse: any) => {
      if (geocode_reponse.results[0]) {
        this.addressLatitude = geocode_reponse.results[0].geometry.location.lat;
        this.addressLongitude = geocode_reponse.results[0].geometry.location.lng;
        this.dismissLoader();
        this.map.setCamera({
          coordinate: {
            lat: this.addressLatitude,
            lng: this.addressLongitude,
          },
          zoom: 10
        });
      } else {
        this.dismissLoader();
      }
      
      // Create a new session token for the next search
      this.sessionToken = new google.maps.places.AutocompleteSessionToken();
    });
  }


  updateSearchResults(event: any) {
    this.autocomplete.input = event.detail.value;
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }

    const request: google.maps.places.AutocompletionRequest = {
      input: event.detail.value,
      types: ['geocode'],
      language: this.language,
      sessionToken: this.sessionToken
    };

    // Using the new Places API with promises
    const autocompleteService = new google.maps.places.AutocompleteService();
    
    autocompleteService.getPlacePredictions(request)
      .then((response: any) => {
        this.zone.run(() => {
          if (response && response.predictions) {
            this.autocompleteItems = response.predictions;
          } else {
            this.autocompleteItems = [];
          }
        });
      })
      .catch((error: Error) => {
        console.error('Error getting place suggestions:', error);
        this.autocompleteItems = [];
      });
  }


  presentLoader(loaderText: any) {
    if (!this.loader) {
      this.loader = this.loaderCtrl.present(loaderText);
    }
  }


  dismissLoader() {
    if (this.loader) {
      this.loader = this.loaderCtrl.dismiss();
      this.loader = null;
      }
    }


  openMeetingModal(meetingIDs: any) {
    this.meetingListService.getMeetingsByIDs(meetingIDs).then((response) => {
      this.meeting = response.data;
      this.meeting.filter((i: any) => i.start_time_raw = this.convertTo12Hr(i.start_time));
      this.openModal(this.meeting);
    });
  }


  async openModal(meeting: any) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        data: this.meeting
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
    });

    return await modal.present();
  }

  public convertTo12Hr(timeString: any) {
    const H = +timeString.substr(0, 2);
    const h = H % 12 || 12;
    const ampm = (H < 12 || H === 24) ? ' am' : ' pm';
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }

}
