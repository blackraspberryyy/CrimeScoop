import firebase from 'react-native-firebase'
import getDocumentReferenceValue from './getDocumentReferenceValue'
// NOTE: For now, all clauses will use the given comparison.
// NOTE2: For now, props that has object in it are not acceptable.

// TODO: can declare comparison for each clauses
// TODO: can include object for props

/* Props should look like this:
props: {
  key: 'value'
  fnname: 'Juan'
}
*/

/* Comparison can be empty or: 
  <, 
  <=, 
  ==, //default
  >, 
  >=,
  array_contains
*/

function generateWhereClauses(collectionRef, props, comparison){
  const keys = Object.keys(props)
  let query = collectionRef

  keys.forEach(key => {
    query = query.where(key, comparison, props[key])
  });
  return query
}


export default function(collection, props, comparison, isDocumentRefType){
  return new Promise((resolve, reject) => {
    // get document with 'Where' clause
    if(!collection){
      reject('No collection provided')
    }
    const collectionRef = firebase.firestore().collection(collection)
    
    if(!comparison){
      comparison = '=='
    }

    if(!isDocumentRefType){
      isDocumentRefType = false
    }
    
    let query
    if(props){
      query = generateWhereClauses(collectionRef, props, comparison)
    }else{
      query = collectionRef
    }

    let rows

    query.get()
    .then(querySnapshot => {
      if(isDocumentRefType){
        rows = querySnapshot.docs.map(doc => doc.ref.path)
      }else{
        rows = querySnapshot.docs.map(doc => doc.data())
        rows.forEach(row => {
          getDocumentReferenceValue(row)
        })
      }
      resolve(rows)
    }).catch(err => {
      reject(err)
    })

  })
}