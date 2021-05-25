# BMLT Meeting Search

## Apple iphone/ipad app link

https://itunes.apple.com/us/app/bmlt-search/id1370165741?mt=8

## Android phone/tablet link

https://play.google.com/store/apps/details?id=ie.nasouth.bmltsearch&hl=en

## Build it yourself (on a mac)

Download the master.zip file...

https://github.com/bmlt-enabled/BMLTSearch3/archive/master.zip

Unzip the zip file and cd into the directory that is created

Install Ionic Framework (For more details see https://ionicframework.com/)
```
$ npm install -g ionic@latest
```
Install package.json dependencies
```
$ npm install
```
Install Cordova/PhoneGap plugins (Cordova Plugins package.json branch dependencies)
```
$ ionic cordova prepare
```
Test your app on multiple screen sizes and platform types by starting a local development server
```
$ ionic cordova run -l
```
To build for app store distribution, I have found that the best thing to do is to run the re-plugin.sh script.
