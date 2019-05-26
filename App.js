import { createStackNavigator, createAppContainer } from 'react-navigation'
import Loading from './app/pages/Loading'
/* import Dashboard from './app/pages/Dashboard'
import SignUp from './app/pages/SignUp'
import Login from './app/pages/Login'
 */

const screens = {
  Loading,
/*   Dashboard,
  SignUp,
  Login */
}

const navigationOptions = { 
  headerMode: 'none', 
  initialRouteName: 'Loading' 
}

const AppNavigator = createStackNavigator(screens, navigationOptions)

export default createAppContainer(AppNavigator)
