import firebase from 'react-native-firebase'

let returnObj = {
  brgyOfficer: null,
  policeOfficer: null
}

function setReturnObj(key, value) {
  return new Promise((resolve, reject) => {
    returnObj[key] = value
    resolve()
  })
}

export default function(barangay, isHigh){
  return new Promise((resolve, reject) => {
    if(!isHigh){
      isHigh = false
    }
    //Each Barangay must have one Barangay Officer and police Officer
    let query = firebase.firestore().collection('Users')
      .where('role', '==', 'brgy_officer')
      .where('brgys', 'array-contains', barangay)

    query.get()
      .then(querySnapshot => {
        if(querySnapshot.empty){
          resolve('No barangay officer results')
        }else{
          setReturnObj('brgyOfficer', querySnapshot.docs[0].data()).then(()=>{
            if(isHigh){
              let query2 = firebase.firestore().collection('Users')
              .where('role', '==', 'police_officer')
              .where('brgys', 'array-contains', barangay)
              query2.get()
              .then(querySnapshot2 => {
                if(querySnapshot2.empty){
                  setReturnObj('policeOfficer', null)
                  resolve(returnObj)
                }else{
                  setReturnObj('policeOfficer', querySnapshot2.docs[0].data())
                  resolve(returnObj)
                }
              }).catch(err => {
                reject(err)
              })
            }else{
              resolve(returnObj)
            }
          })
        }
      }).catch(err => {
        reject(err)
      })
  })


}