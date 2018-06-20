# muslimKit
Muslim kit project ..  
A mobile [Android/IOS] app that provides muslim with his azkar during the day and A json source for the Azkar ..

## Stack 
- Vuejs 
- Vuex
- Nativescript-vue

## Usage

1.  Install NativeScript tools (see http://docs.nativescript.org/start/quick-setup)

2.  Install dependencies

```bash
npm install 
```

> While the `nativescript-vue` project is not up-to-date on npm, you may have to run
> `npm link nativescript-vue` in the project folder (like [described here](https://github.com/rigor789/nativescript-vue/blob/master/CONTRIBUTING.md)).

3.  Run in Android or iOS

```bash
tns run android
tns run ios
```

4. Build for Android or iOS

```bash
tns build android
tns build ios
```

## How it works 
It checks for available Azkar list at [list.json](../docs/json/list.json) and downloads the json files, store it localy and it reads the local files.

## JSON 
[json](docs/json) directory contains the Azkar in json files, I'll upload every file once i create it.      
you can find a list of available azkar files in [README.md#list](../docs/json/README.md#list)  


## Wanna help ? 
Create a json file for an Azkar type and make a pull request.