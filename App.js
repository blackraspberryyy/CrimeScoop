import React, { Component } from 'react'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import { StyleProvider, Root } from "native-base";
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import routes from './navRoutes'
import SideBar from "./app/components/Nav/SideBar.js";
import Dashboard from './app/pages/Dashboard'
import Loading from './app/pages/Loading'
import Login from './app/pages/Login'
import Welcome from './app/pages/Welcome'
import SignUp from './app/pages/SignUp'
import getComponentsFromRoutes from './app/tools/getComponentsFromRoutes';

const CustomDrawerContent = props => <SideBar {...props} />

const nav2 = getComponentsFromRoutes(routes)

const drawerOptions = {
  initialRouteName: 'Dashboard',
  contentComponent: CustomDrawerContent
}

const AppDrawer = createDrawerNavigator(nav2, drawerOptions)

const screens = {
  Loading,
  Login,
  Welcome,
  SignUp,
  AppDrawer
}

const stackOptions = { 
  headerMode: 'none', 
  initialRouteName: 'Loading',
  transitionConfig: getSlideFromRightTransition
}

const AppNavigator = createStackNavigator(screens, stackOptions)
const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Root>
          <AppContainer />
        </Root>
      </StyleProvider>
    );
  }
}
