import firebase from 'react-native-firebase'
// NOTE: For now, all clauses will use the given comparison.
// TODO: can declare comparison for each clauses

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

  if(keys.length === 1){
    const key = keys[0]
    query = query.where(key, comparison, props[key])
    return query
  }else{
    keys.forEach(key => {
      query = query.where(key, comparison, props[key])
    });
    return query
  }
}


export default function(collection, props, comparison, isDocumentRefType){
  return new Promise((resolve, reject) => {
    // get document with 'Where' clause
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
      }
      resolve(rows)
    }).catch(err => {
      reject(err)
    })

  })
}