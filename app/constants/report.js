import coordinatesObj from './coordinates'
import userObj from '../constants/user'
import brgyOfficerObj from '../constants/brgyOfficer'
import policeOfficerObj from './policeOfficer'

export default report = {
  crime: '',
  location: '',
  coord: coordinatesObj,
  barangay: '',
  datetime: '',
  details: '',
  status: 1, // 1 for pending, 2 for responding, 3 for resolved, 4 for Bogus
  upload: '',
  reportedBy: '', //reference Object
  brgyOfficer: '', //reference Object
  policeOfficer: '' //reference Object
}