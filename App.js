import React, { Component } from 'react'
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation'
import { StyleProvider, Root, Container, Header, Content, Left, Right, Button, Icon, Body, Title } from "native-base";
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import Loading from './app/pages/Loading'
import Login from './app/pages/Login'
import Welcome from './app/pages/Welcome'
import Dashboard from './app/pages/Dashboard'
import SignUp from './app/pages/SignUp'
import misc from './app/styles/misc'

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

const CustomDrawerContent = props => (
  <Container>
    <Header transparent>
      <Left>
        <Button
          transparent
          onPress={() => props.navigation.closeDrawer()}
        >
          <Icon 
            name={'arrow-back'}
            style={misc.blackText}
          />
        </Button>
      </Left>
      <Body>
        <Title style={[misc.catamaran, misc.blackText]}>Navigation</Title>
      </Body>
      <Right />
    </Header>
    <Content>
      <DrawerItems {...props}/>
    </Content>
  </Container>
)

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
  initialRouteName: 'Loading'
}

const AppNavigator = createSwitchNavigator(screens, stackOptions)
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
