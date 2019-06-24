import reportObj from '../constants/report'
import getCoordinates from '../tools/getCoordinates'
import getTranslatedAddress from '../tools/getTranslatedAddress'
import getBarangay from '../tools/getBarangay'
import uploadMedia from '../tools/uploadMedia';
import firebase from 'react-native-firebase'
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

export default async function (crime, details, uri, filename) {
  let promise = await new Promise((resolve, reject) => {
    if (!(crime && crime.hasOwnProperty('type') && crime.hasOwnProperty('name'))) {
      returnObj.message = 'Invalid Crime Format'
      reject(returnObj)
    }
    
    setReport('crime', crime).then(() => {
      setReport('details', details)

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
              setReport('brgyOfficer', ref.brgyOfficer)
              if (isHigh) {
                setReport('policeOfficer', ref.policeOfficer)
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
            setReport('reportedBy', res[0])
          })
        } else {
          returnObj.message = 'No current User'
          reject(returnObj)
        }
      })
    })
    
    resolve(returnObj)
  })

  return promise
}