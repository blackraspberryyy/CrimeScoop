import reportObj from '../constants/report'
import getCoordinates from '../tools/getCoordinates'
import getTranslatedAddress from '../tools/getTranslatedAddress'
import getBarangay from '../tools/getBarangay'

let report = reportObj
let reportedByUid = ''

function setReport(key, value){
  report[key] = value
}

function getReport(key){
  return report[key]
}

export default function(crime){
  if(!(crime && crime.hasOwnProperty('type') && crime.hasOwnProperty('name'))){
    return
  }else{
    setReport('crime', crime)
  }
  
  getCoordinates()
    .then(coordinate => {
      setReport('coord', coordinate)
      getTranslatedAddress(coordinate)
        .then(result => {
          setReport('location', result)
        }).catch(result => {
          setReport('location', result)
        })
      getBarangay(coordinate)
        .then(result => {
          if(result){
            setReport('barangay', result.properties.NAME_3)
          }else{
            setReport('barangay', '')
          }
          console.log(report)
        })
    }).catch(coordinate => {
      setReport('coord', coordinate)
    })
  

  //get officers involved
  //get reported by
}