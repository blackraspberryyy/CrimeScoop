import getPopulatedReport from "./getPopulatedReport";

export default async function(crime, details, uri, filename){
  let r = null
  await getPopulatedReport(crime, details, uri, filename).then(report => {
    r = report.report
  })
  await firebase.firestore().collection('Reports').add(r)
}