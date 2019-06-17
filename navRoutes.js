import Dashboard from './app/pages/Dashboard'
import ReportCrime from './app/pages/ReportCrime'

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
  }
];