import json from './Barangays.json'

export default function () {
  const ref = json.features
  let tmp = []
  ref.forEach(element => {
    if (element.properties.REGION == 'Metropolitan Manila') {
      tmp.push(element)
    }
  });
  console.log(JSON.stringify(tmp))
}