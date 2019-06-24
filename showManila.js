import json from './Barangays.json'

export default function () {
  const ref = json.features.map(e => e.properties)
  let tmp = []
  ref.forEach(element => {
    if (element.REGION == 'Metropolitan Manila') {
      tmp.push(element)
    }
  });
  console.log(JSON.stringify(tmp))
}