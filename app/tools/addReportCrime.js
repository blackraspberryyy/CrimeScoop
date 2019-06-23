import reportObj from '../constants/report'
import getCoordinates from '../tools/getCoordinates'
import getTranslatedAddress from '../tools/getTranslatedAddress'
import getBarangay from '../tools/getBarangay'
import uploadMedia from '../tools/uploadMedia';

let report = reportObj

let returnObj = {
  message: '',
  report: report
}

function setReport(key, value) {
  return new Promise((resolve, reject) => {
    report[key] = value
    resolve()
  })
}

export default function (crime, uri, filename) {
  return new Promise((resolve, reject) => {
    if (!(crime && crime.hasOwnProperty('type') && crime.hasOwnProperty('name'))) {
      reject(returnObj)
    } else {
      setReport('crime', crime)
    }
  
    getCoordinates()
      .then(coordinate => {
        setReport('coord', coordinate).then(e => {
          getTranslatedAddress(coordinate)
            .then(result => {
              setReport('location', result)
            }).catch(result => {
              setReport('location', result)
            })
          getBarangay(coordinate)
            .then(result => {
              if (result) {
                setReport('barangay', result.properties.NAME_3)
              } else {
                setReport('barangay', '')
              }
            })
        })
      }).catch(coordinate => {
        setReport('coord', coordinate)
      })
  
      uploadMedia(uri, filename).then(url => {
        setReport('upload', url)
      })
  
  
    //get officers involved
    //get reported by

    resolve(returnObj)
  })
}