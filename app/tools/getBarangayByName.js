import geoJson from '../../metroManila.json'

export default function(name){
  return new Promise((resolve, reject) => {
    const ref = geoJson.features
    let polygon = []
    ref.forEach(element => {
      if(element.properties.NAME_3 == name){
        polygon = element
        let geojsonWrapper = {
          type: "featureCollection",
          features: [polygon]
        }
        resolve(geojsonWrapper)
      }
    });
    reject('Barangay is not on Metro Manila')
  })
}