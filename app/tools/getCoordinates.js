import coordinatesObj from '../constants/coordinates'

export default function(){
  return new Promise((resolve, reject) => {
    let coord = coordinatesObj
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
  })
}