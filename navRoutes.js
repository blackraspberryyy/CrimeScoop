import Dashboard from './app/pages/Dashboard'
import ReportCrime from './app/pages/ReportCrime'
import ManageCrime from './app/pages/ManageCrime'

export default routes = [
  {
    key: 'Dashboard',
    route: 'Dashboard',
    icon: 'home',
    component: Dashboard
  },
  {
    key: 'Report a Crime',
    route: 'ReportCrime',
    icon: 'warning',
    component: ReportCrime
  },
  {
    key: 'Manage Crime',
    route: 'ManageCrime',
    icon: 'cog',
    component: ManageCrime
  }
];