
import firebase from 'react-native-firebase'
import { isInteger } from 'lodash'

let statuses = ["inactive", "active"]

export default function(documentId, status){
  return new Promise(async (resolve, reject) => {
    const docRef = firebase.firestore().collection('NotoriousCriminals').doc(documentId)
    await docRef.update({
      status: status
    })
    resolve('The criminal successfully deleted')
  })
}