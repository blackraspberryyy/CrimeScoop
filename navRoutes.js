import Dashboard from './app/pages/Dashboard'

/*
== Navigator Tree ==
- Main (SwitchNavigator)
  - Loading
  - Welcome
  - Sign In
  - Sign Up
  - Sidebar (DrawerNavigator)
    - Dashboard
    - .. some navs
    - Logout
*/

export default routes = [
  {
    key: 'Dashboard',
    route: 'AppDrawer',
    icon: 'home',
    component: Dashboard
  }
];