import firebase from 'react-native-firebase'

let returnObj = {
  brgyOfficer: '',
  policeOfficer: ''
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
      .where('brgys.barangay', '==', barangay)

    query.get()
      .then(querySnapshot => {
        if(querySnapshot.empty){
          reject('No baranggay officer results')
        }else{
          setReturnObj('brgyOfficer', querySnapshot.docs[0].ref.path).then(()=>{
            if(isHigh){
              let query2 = firebase.firestore().collection('Users')
              .where('role', '==', 'police_officer')
              .where('brgys', '==', {barangay: barangay})
              query2.get()
              .then(querySnapshot => {
                if(querySnapshot.empty){
                  setReturnObj('policeOfficer', '')
                  resolve(returnObj)
                }else{
                  setReturnObj('policeOfficer', querySnapshot.docs[0].ref.path)
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