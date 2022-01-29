#!/bin/bash
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

if [ -z "$1" ]
then

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
fi

echo "** Adding ios and android platforms"
ionic cordova platform add ios@latest
ionic cordova platform add android@latest
# ionic cordova platform add browser@latest

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

echo "** Building for ios and android"
ionic cordova prepare ios --prod
ionic cordova prepare android --prod
# ionic cordova prepare browser --prod

# ionic cordova resources ios
# ionic cordova resources android

echo "** Prod build"
ionic build --prod  --minifyjs   --minifycss  --optimizejs
