import firebase from 'react-native-firebase'
import reportObj from '../constants/report'
import getCoordinates from './getCoordinates'
import getTranslatedAddress from './getTranslatedAddress'
import getBarangay from './getBarangay'
import uploadMedia from './uploadMedia';
import getDataWithProps from './firestore/getDataWithProps';
import getOfficerByBrgy from './getOfficerByBrgy'

let report = reportObj

let returnObj = {
  message: '',
  report: report
}

function setReport(key, value) {
  return new Promise((resolve, reject) => {
    report[key] = value
    resolve(report)
  })
}

export default async function(crime, details, uri, filename){
  let promise = await new Promise(async (resolve, reject) => {
    if (!(crime && crime.hasOwnProperty('type') && crime.hasOwnProperty('name'))) {
      returnObj.message = 'Invalid Crime Format'
      reject(returnObj)
    }
    
    await setReport('crime', crime).then(async () => {
      await setReport('details', details)
      await setReport('reportedAt', firebase.firestore.Timestamp.fromDate(new Date()))

      await getCoordinates().then(async coordinate => {
        await setReport('coord', coordinate)
        await getTranslatedAddress(coordinate).then(async result => {
          await setReport('location', result)
        }).catch(async result => {
          await setReport('location', result)
        })
        await getBarangay(coordinate).then(async result => {
          let brgy = result.properties.NAME_3
          await setReport('barangay', brgy).then(async () => {
            let isHigh = crime && crime.type == 2 ? true : false
            await getOfficerByBrgy(brgy, isHigh).then(async ref => {
              await setReport('brgyOfficer', ref.brgyOfficer ? firebase.firestore().doc(ref.brgyOfficer) : null)
              if (isHigh) {
                await setReport('policeOfficer', ref.policeOfficer ? firebase.firestore().doc(ref.policeOfficer) : null)
              }
            })
          })
        }).catch(async err => {
          await setReport('barangay', '')
          returnObj.message = 'Could not find your Barangay'
          reject(returnObj)
        })
      }).catch(async coordinate => {
        await setReport('coord', coordinate)
        returnObj.message = 'Could not find your Location'
        reject(returnObj)
      })

      await uploadMedia(uri, filename).then(async url => {
        await setReport('upload', url)
      }).catch(async err => {
        await setReport('upload', '')
        returnObj.message = 'No submitted Image'
        reject(returnObj)
      })

      let uid = await firebase.auth().currentUser.uid
      await getDataWithProps('Users', { uid: uid }, null, true).then(async res => {
        await setReport('reportedBy', res[0] ? firebase.firestore().doc(res[0]) : null)
      })

    })
    resolve(returnObj)
    await firebase.firestore().collection('Reports').add(returnObj.report)
  })
  return promise
}