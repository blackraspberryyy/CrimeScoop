
import firebase from 'react-native-firebase'
import { isInteger } from 'lodash'

/* Status can be:
  1. Pending,
  2. Responding,
  3. Resolved,
  4. Bogus
*/

let statuses = ["", "Pending", "Responding", "Resolved", "Bogus"]

export default function(documentId, status){
  return new Promise(async (resolve, reject) => {
    if(!isInteger(status) || status > 4 || status < 1){
      reject('Status can only be 1, 2, 3, or 4')
    }

    const docRef = firebase.firestore().collection('Reports').doc(documentId)
    await docRef.update({
      status: status
    })
    resolve('Successfully Changed Report Status to ' + statuses[status])
  })
}