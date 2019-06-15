import GeoJsonGeometriesLookup from 'geojson-geometries-lookup'
import geoJson from '../../Barangays.json'

// sample snippet

// getCoordinate = () => {
//   let long = 121.00436210632324
//   let lat = 14.603881611661933
//   let feat = getBarangay(lat, long)
//   console.log(feat.properties.NAME_3)
// }

export default function(lat, long) {
  const options = {ignorePoints: true, ignoreLines: true}
  const glookup = new GeoJsonGeometriesLookup(geoJson, options)

  const point = {type: "Point", coordinates: [long, lat]}
  const containersCount = glookup.countContainers(point, options)

  if(containersCount == 0){
    // no barangays found
    return null
  }else{
    // either a location is under two or more barangays
    // or if a location is under one barangay,
    // always get the feature of the first one
    let feature = glookup.getContainers(point, options)
    feature = feature.features[0]
    return feature
  }
}