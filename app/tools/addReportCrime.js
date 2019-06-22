import reportObj from '../constants/report'
import firebase from 'react-native-firebase'

let report = reportObj
let reportedByUid = ''

function setReport(key, value){
  report[key] = value
}

export default function(crime){
  if(!(crime && crime.hasOwnProperty('type') && crime.hasOwnProperty('name'))){
    return
  }else{
    setReport('crime', crime)
  }
  
  navigator.geolocation.getCurrentPosition(
    position => {
      report.coord.lat = position.coords.latitude
      report.coord.lon = position.coords.longitude

      const key = "dcb0c0c270922b"
      let {lat, lon} = report.coord
      
      fetch('http://us1.locationiq.com/v1/reverse.php?key=' + key + '&lat=' + lat + '&lon=' + lon + '&format=json')
      .then(response => {
        return response.json() 
      })
      .catch(error => {
        setReport('location', 'Cannot find your location')
      })
      .then(address => {
        setReport('location', address.display_name)
      })
    },
    error => {
      setReport('location', 'Cannot find your location')
    },
    { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
  )

  console.log(report)
}