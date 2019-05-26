import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Loading from './app/pages/Loading'
import Login from './app/pages/Login'
import Welcome from './app/pages/Welcome'
import Dashboard from './app/pages/Dashboard'
/* import SignUp from './app/pages/SignUp'
*/

const screens = {
  Loading,
  Login,
  Welcome,
  Dashboard,
  /*   SignUp,  */
}

const navigationOptions = { 
  headerMode: 'none', 
  initialRouteName: 'Loading'
}

const AppNavigator = createSwitchNavigator(screens, navigationOptions)

export default createAppContainer(AppNavigator)
