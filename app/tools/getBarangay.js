import GeoJsonGeometriesLookup from 'geojson-geometries-lookup'
import geoJson from '../../metroManila.json'

/* sample snippet
  getBarangay(coordinate)
  .then(result => {
    if(result){
      setReport('barangay', result.properties.NAME_3)
    }else{
      setReport('barangay', '')
    }
    console.log(report)
  }) 
*/
export default function(coordinate, getContainer){
  return new Promise((resolve, reject) => {
    if(!getContainer){
      getContainer = false
    }
    const options = {ignorePoints: true, ignoreLines: true}
    const glookup = new GeoJsonGeometriesLookup(geoJson, options)
    const point = {type: "Point", coordinates: [coordinate.lon, coordinate.lat]}
    const containersCount = glookup.countContainers(point, options)
    if(containersCount == 0){
      // no barangays found
      reject(null)
    }else{
      // either a location is under two or more barangays
      // or if a location is under one barangay,
      // always get the feature of the first one
      let feature
      if(getContainer){
        feature = glookup.getContainers(point, options)
        resolve(feature)
      }else{
        feature = glookup.getContainers(point, options)
        feature = feature.features[0]
        resolve(feature)
      }
    }
  })
}