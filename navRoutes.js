import Dashboard from './app/pages/Dashboard'
import ReportCrime from './app/pages/ReportCrime'
import ManageCrime from './app/pages/ManageCrime'
import ManageOfficers from './app/pages/ManageOfficers'


/*
  Auth is an array of strings.
*/

export default routes = [
  {
    key: 'Dashboard',
    route: 'Dashboard',
    icon: 'home',
    component: Dashboard,
    auth: ['reporter', 'brgy_officer', 'police_officer', 'superadmin']
  },
  {
    key: 'Report a Crime',
    route: 'ReportCrime',
    icon: 'warning',
    component: ReportCrime,
    auth: ['reporter', 'brgy_officer', 'police_officer', 'superadmin']
  },
  {
    key: 'Manage Crime',
    route: 'ManageCrime',
    icon: 'cog',
    component: ManageCrime,
    auth: ['brgy_officer', 'police_officer', 'superadmin']
  },
  {
    key: 'Manage Officers',
    route: 'ManageOfficers',
    icon: 'people',
    component: ManageOfficers,
    auth: ['superadmin']
  }
];