# muslimKit
Muslim kit project ..  
A mobile [Android/IOS] app that provides muslim with his azkar during the day and A json source for the Azkar ..

## Stack 
- Vuejs 
- Vuex
- Nativescript-vue

## Build 
check the documentation in [nativescript-vue.org/](https://nativescript-vue.org/en/docs/getting-started/templates/#nativescript-vuenativescript-vue-template)

```bash
//install dependencies
npm install 

//to run the app in the emulator
tns run android 
tns run ios 

//to build the app 
tns build android
tns build ios
```

## How it works 
It checks for available Azkar list at [json/list.json](./json/list.json) and downloads the json files, store it localy and it reads the local files.

## JSON 
[json](./json) directory contains the Azkar in json files, I'll upload every file once i create it.      
you can find a list of available azkar files in [json/README.md#list](json/README.md#list)  


## Wanna help ? 
Create a json file for an Azkar type and make a pull request.