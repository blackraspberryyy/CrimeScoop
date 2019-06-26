import firebase from 'react-native-firebase'
import getDocumentReferenceValue from './getDocumentReferenceValue'

export default function(collection, docId){
  return new Promise((resolve, reject) => {
    if(!collection){
      reject('No collection provided')
    }
    const collectionRef = firebase.firestore().collection(collection)
    let rows;
    if(!docId){
      // get all docs in collection
      collectionRef.get()
        .then(querySnapshot => {
          rows = querySnapshot.docs.map(doc => doc.data())
          rows.forEach(row => {
            getDocumentReferenceValue(row)
          })
          resolve(rows)
        }).catch(err => {
          reject(err)
        })
    }else{
      // get specific document
      // a docId must always be unique so it should return one element[0]
      const docRef = collectionRef.doc(docId)
      docRef.get()
        .then(querySnapshot => {
          rows = querySnapshot.docs[0].data()
          resolve(rows)
        }).catch(err => {
          reject(err)
        })
    }
  })
}