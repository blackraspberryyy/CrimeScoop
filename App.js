import React, { Component } from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { StyleProvider, Root } from "native-base";
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import Loading from './app/pages/Loading'
import Login from './app/pages/Login'
import Welcome from './app/pages/Welcome'
import Dashboard from './app/pages/Dashboard'
import SignUp from './app/pages/SignUp'


const screens = {
  Loading,
  Login,
  Welcome,
  Dashboard,
  SignUp, 
}

const navigationOptions = { 
  headerMode: 'none', 
  initialRouteName: 'Loading'
}

const AppNavigator = createSwitchNavigator(screens, navigationOptions)
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
