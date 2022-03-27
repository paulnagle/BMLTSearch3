# BMLT Meeting Search

[![Build Debug Android](https://github.com/bmlt-enabled/BMLTSearch3/actions/workflows/build-debug-android.yaml/badge.svg)](https://github.com/bmlt-enabled/BMLTSearch3/actions/workflows/build-debug-android.yaml.yaml)

[![Build Release Android](https://github.com/bmlt-enabled/BMLTSearch3/actions/workflows/build-release-android.yaml/badge.svg)](https://github.com/bmlt-enabled/BMLTSearch3/actions/workflows/build-release-android.yaml.yaml)

This app is built for Andoid and Apple devices using the Ionic Framework (For more details see https://ionicframework.com/)

## Apple iphone/ipad app link

https://itunes.apple.com/us/app/bmlt-search/id1370165741?mt=8

## Android phone/tablet link

https://play.google.com/store/apps/details?id=ie.nasouth.bmltsearch&hl=en

## Build it yourself (on a mac)

Download the version_4.zip file...

https://github.com/bmlt-enabled/BMLTSearch3/archive/refs/heads/version_4.zip

Unzip the zip file and cd into the directory that is created

Install package.json dependencies
```
$ npm install
```
To build for app store distribution, and install all plugin dependencies, use the build.sh script.
```
./build.sh

Usage: -b (Build for browser)
       -i (Build for ios)
       -a (Build for android)
       -c (Clean old build files)
```
Test your app on multiple screen sizes and platform types by starting a local development server
```
$ ionic cordova run -l
```
or
```
$ ionic cordova serve
```

## Branches
The default branch is called version_4 
This corresponds to the 4.xx.xx releases for Apple and Android.

The version_3 branch holds the source code for the old version 3.xx.xx releases
