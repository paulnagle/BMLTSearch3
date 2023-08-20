import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { StorageService } from './providers/storage.service';
import { Drivers } from '@ionic/storage';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/translations/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  // entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    IonicStorageModule.forRoot({     
      name: '__bmltsearchdb',
      driverOrder: [ Drivers.LocalStorage]
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    HTTP,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
