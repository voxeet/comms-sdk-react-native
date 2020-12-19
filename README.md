
# @voxeet/react-native-voxeet-sdk

## Getting started

`$ npm install @voxeet/react-native-voxeet-sdk --save`

### Mostly automatic installation

`$ react-native link @voxeet/react-native-voxeet-sdk`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `@voxeet/react-native-voxeet-sdk` and add `RNVoxeetSdk.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNVoxeetSdk.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import io.dolby.sdk.RNVoxeetSdkPackage;` to the imports at the top of the file
  - Add `new RNVoxeetSdkPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':@voxeet/react-native-voxeet-sdk'
  	project(':@voxeet/react-native-voxeet-sdk').projectDir = new File(rootProject.projectDir, 	'../node_modules/@voxeet/react-native-voxeet-sdk/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':@voxeet/react-native-voxeet-sdk')
  	```


## Usage
```javascript
import RNVoxeetSdk from '@voxeet/react-native-voxeet-sdk';

// TODO: What to do with the module?
RNVoxeetSdk;
```
  