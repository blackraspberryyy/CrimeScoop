import { isObject } from 'lodash'

export default function (obj){
  let returnObj = obj
  if(obj && isObject(obj)){
    let keys = Object.keys(obj)
    keys.forEach(key => {
      if(isObject(obj[key]) && obj[key].constructor.name == 'DocumentReference'){
        // the object[key] is a DocumentReference
        obj[key].get().then(doc => {
          returnObj[key] = doc.data()
        })
      }else{
        returnObj[key] = obj[key]
      }
    })
  }else{
    return returnObj
  }
}