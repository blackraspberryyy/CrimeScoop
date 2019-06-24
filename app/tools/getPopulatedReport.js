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

export default function (crime, details, uri, filename) {
  /* if (!(crime && crime.hasOwnProperty('type') && crime.hasOwnProperty('name'))) {
    returnObj.message = 'Invalid Crime Format'
    reject(returnObj)
  }

  await setReport('crime', crime)
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
    })
  }).catch(async coordinate => {
    await setReport('coord', coordinate)
    returnObj.message = 'Could not find your Location'
  })

  await uploadMedia(uri, filename).then(async url => {
    await setReport('upload', url)
  }).catch(async err => {
    await setReport('upload', '')
    returnObj.message = 'No submitted Image'
  })

  firebase.auth().onAuthStateChanged(async u => {
    if (u) {
      await getDataWithProps('Users', { uid: u.uid }, null, true).then(async res => {
        await setReport('reportedBy', res[0] ? firebase.firestore().doc(res[0]) : null)
      })
    } else {
      returnObj.message = 'No current User'
    }
  }) */

  let promise = new Promise((resolve, reject) => {
    if (!(crime && crime.hasOwnProperty('type') && crime.hasOwnProperty('name'))) {
      returnObj.message = 'Invalid Crime Format'
      reject(returnObj)
    }
    
    setReport('crime', crime).then(() => {
      setReport('details', details)
      setReport('reportedAt', firebase.firestore.Timestamp.fromDate(new Date()))

      getCoordinates().then(coordinate => {
        setReport('coord', coordinate)
        getTranslatedAddress(coordinate).then(result => {
          setReport('location', result)
        }).catch(result => {
          setReport('location', result)
        })
        getBarangay(coordinate).then(result => {
          let brgy = result.properties.NAME_3
          setReport('barangay', brgy).then(() => {
            let isHigh = crime && crime.type == 2 ? true : false
            getOfficerByBrgy(brgy, isHigh).then(ref => {
              setReport('brgyOfficer', ref.brgyOfficer ? firebase.firestore().doc(ref.brgyOfficer) : null)
              if (isHigh) {
                setReport('policeOfficer', ref.policeOfficer ? firebase.firestore().doc(ref.policeOfficer) : null)
              }
            })
          })
        }).catch(err => {
          setReport('barangay', '')
          returnObj.message = 'Could not find your Barangay'
          reject(returnObj)
        })
      }).catch(coordinate => {
        setReport('coord', coordinate)
        returnObj.message = 'Could not find your Location'
        reject(returnObj)
      })

      uploadMedia(uri, filename).then(url => {
        setReport('upload', url)
      }).catch(err => {
        setReport('upload', '')
        returnObj.message = 'No submitted Image'
        reject(returnObj)
      })

      firebase.auth().onAuthStateChanged(u => {
        if (u) {
          getDataWithProps('Users', { uid: u.uid }, null, true).then(res => {
            setReport('reportedBy', res[0] ? firebase.firestore().doc(res[0]) : null)
          })
        } else {
          returnObj.message = 'No current User'
          reject(returnObj)
        }
      })
    })
  })


  return promise
}