export default function(coordinate){
  return new Promise((resolve, reject) => {
    const key = "dcb0c0c270922b"
    let {lat, lon} = coordinate
    
    fetch('http://us1.locationiq.com/v1/reverse.php?key=' + key + '&lat=' + lat + '&lon=' + lon + '&format=json')
    .then(response => {
      return response.json() 
    })
    .catch(error => {
      reject('Cannot get translated address.')
    })
    .then(address => {
      resolve(address.display_name)
    })
  })
}