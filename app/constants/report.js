import coordinatesObj from './coordinates'
import userObj from '../constants/user'

export default report = {
  crime: '',
  location: '',
  coord: coordinatesObj,
  barangay: '',
  datetime: '',
  details: '',
  uploads: '',
  reportedBy: userObj,
  brgyOfficer: userObj,
  policeOfficer: userObj
}