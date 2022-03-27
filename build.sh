#!/bin/bash

usage(){
	echo "Usage: -b (Build for browser)"
    echo "       -i (Build for ios)"
    echo "       -a (Build for android)"
    echo "       -c (Clean old build files)"
	exit 1
}

add_plugins() {
    echo "** Adding cordova plugins"
    ionic cordova plugin add cordova-plugin-splashscreen
    ionic cordova plugin add cordova-plugin-statusbar
    ionic cordova plugin add cordova-plugin-googlemaps
    ionic cordova plugin add com-badrit-base64
    ionic cordova plugin add cordova-plugin-ionic-webview
    ionic cordova plugin add cordova-plugin-inappbrowser
    ionic cordova plugin add cordova-plugin-geolocation
    ionic cordova plugin add cordova-plugin-advanced-http
    ionic cordova plugin add cordova-plugin-androidx-adapter
}

install_deps() {
    echo "** Installing ionic cli"
    npm install -g --save @ionic/cli native-run cordova-res cordova

    echo "** Installing other npm dependencies"
    npm install --save \
        @ionic-native/google-maps \
        @ionic-native/base64 \
        @awesome-cordova-plugins/in-app-browser \
        @awesome-cordova-plugins/geolocation  \
        @awesome-cordova-plugins/http  \
        @awesome-cordova-plugins/splash-screen \
        @awesome-cordova-plugins/http \
        @awesome-cordova-plugins/status-bar \
        @ngx-translate/core \
        @ngx-translate/http-loader \
        @ionic/storage-angular \
        thenby \
        moment \
        moment-timezone
}

clean_old_build() {
    rm -rf www

    ionic cordova platform rm ios
    ionic cordova platform rm android
    ionic cordova platform rm browser

    ionic cordova plugin rm cordova-plugin-splashscreen
    ionic cordova plugin rm cordova-plugin-statusbar
    ionic cordova plugin rm cordova-plugin-googlemaps
    ionic cordova plugin rm com-badrit-base64
    ionic cordova plugin rm cordova-plugin-ionic-webview
    ionic cordova plugin rm cordova-plugin-inappbrowser
    ionic cordova plugin rm cordova-plugin-geolocation
    ionic cordova plugin rm cordova-plugin-advanced-http
    ionic cordova plugin rm cordova-plugin-androidx-adapter
    rm -rf platform/*
}

build_for() {
    PLATFORM=$1

    echo "Building for ${PLATFORM}"
    install_deps
    ionic cordova platform add "${PLATFORM}" --confirm --no-interactive
    add_plugins
    if [[ "${PLATFORM}" != "browser" ]]; then 
        ionic cordova resources "${PLATFORM}"
    fi 
    ionic cordova prepare "${PLATFORM}" 
    ionic cordova build "${PLATFORM}" 
}

[[ $# -eq 0 ]] && usage
while getopts "abci" option; do
   case $option in
      c) # Clean old build files
         clean_old_build
         ;;
      a) # Build for android
         build_for android
         ;;
      i) # Build for ios
         build_for ios
         ;;
      b) # Build for browser
         build_for browser
         ;;
   esac
done
