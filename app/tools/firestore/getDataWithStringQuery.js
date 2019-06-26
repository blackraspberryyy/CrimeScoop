import firebase from 'react-native-firebase'
import getDocumentReferenceValue from './getDocumentReferenceValue'

export default function(collection, key, comparison, value, isDocumentRefType){
  return new Promise((resolve, reject) => {
    if(!isDocumentRefType){
      isDocumentRefType = false
    }
    if(!collection){
      reject('No collection provided')
    }

    if(!key && !comparison && !value){
      reject('Incomplete Query')
    }

    let collectionRef = firebase.firestore().collection(collection)
    let query = collectionRef.where(key, comparison, value)
    let rows
    
    query.get()
    .then(querySnapshot => {
      if(isDocumentRefType){
        rows = querySnapshot.docs.map(doc => (
          {
            id: doc.id,
            path: doc.ref.path
          }
        ))
      }else{
        rows = querySnapshot.docs.map(doc => (
          {
            id: doc.id,
            data: doc.data()
          }
        ))

        rows.forEach(row => {
          getDocumentReferenceValue(row.data)
        })
      }
      resolve(rows)
    }).catch(err => {
      reject(err)
    })

  })
}