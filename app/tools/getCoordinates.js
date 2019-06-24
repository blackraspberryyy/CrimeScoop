import coordinatesObj from '../constants/coordinates'
import { BackHandler, DeviceEventEmitter } from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export default function(){
  return new Promise((resolve, reject) => {
    let coord = coordinatesObj

    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings for location",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
      preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
      providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
    }).then(function(success) {
      navigator.geolocation.getCurrentPosition(
        position => {
          coord.lat = position.coords.latitude
          coord.lon = position.coords.longitude
          resolve(coord)
        },
        error => {
          console.log('Cannot get location')
          console.log(error)
          reject(coord)
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
      )
    }).catch((error) => {
      console.log(error.message); // error.message => "disabled"
      reject(coord)
    });
    
    BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
     //do not use this method if you are using navigation."preventBackClick: false" is already doing the same thing.
      LocationServicesDialogBox.forceCloseDialog();
    });
    
    DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { // only trigger when "providerListener" is enabled
      console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
    });
  })
}