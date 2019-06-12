import React, { Component } from 'react'
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation'
import { StyleProvider, Root, Container, Header, Content, Left, Right, Button, Icon, Body, Title } from "native-base";
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import SideBar from "./app/components/Nav/SideBar.js";
import Loading from './app/pages/Loading'
import Login from './app/pages/Login'
import Welcome from './app/pages/Welcome'
import Dashboard from './app/pages/Dashboard'
import SignUp from './app/pages/SignUp'
import navRoutes from './navRoutes'
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

const CustomDrawerContent = props => <SideBar {...props} />

const nav = {
  Dashboard
}

const drawerOptions = {
  initialRouteName: 'Dashboard',
  contentComponent: CustomDrawerContent
}

const AppDrawer = createDrawerNavigator(nav, drawerOptions, drawerOptions)

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
