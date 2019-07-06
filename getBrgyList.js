import json from './metroManila.json'

export default function () {
  const ref = json.features
  let tmp = []
  ref.forEach(element => {
    let obj = {
      name: '',
      id: ''
    }
    obj['name'] = element.properties.NAME_3
    obj['id'] = String(element.properties.ID_3)
    tmp.push(obj)
  });
  return tmp
}
