import React, { Component } from 'react'
import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import { StyleProvider, Root } from "native-base";
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import wifi from 'react-native-android-wifi';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import routes from './navRoutes'
import SideBar from "./app/components/Nav/SideBar.js";
import Loading from './app/pages/Loading'
import Login from './app/pages/Login'
import Welcome from './app/pages/Welcome'
import SignUp from './app/pages/SignUp'
import getComponentsFromRoutes from './app/tools/getComponentsFromRoutes';
import showToast from './app/tools/showToast';

const CustomDrawerContent = props => <SideBar {...props} />

const nav = getComponentsFromRoutes(routes)
const drawerOptions = {
  initialRouteName: 'Dashboard',
  contentComponent: CustomDrawerContent
}
const AppDrawer = createDrawerNavigator(nav, drawerOptions)

const screens = {
  Welcome,
  Login,
  SignUp,
  AppDrawer
}
const stackOptions = { 
  headerMode: 'none', 
  initialRouteName: 'Welcome',
  transitionConfig: getSlideFromRightTransition
}

const AppNavigator = createStackNavigator(screens, stackOptions)

const AppSwitchNavigator = createSwitchNavigator({Loading, AppNavigator}, {initialRouteName: 'Loading', headerMode: 'None'})
const AppContainer = createAppContainer(AppSwitchNavigator)

export default class App extends Component {
  
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
    this.checkConnectivity();
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      AsyncStorage.setItem('fcmToken', fcmToken);
    });
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
    this.onTokenRefreshListener();
  }

  checkConnectivity(){
    wifi.isEnabled(isEnabled => {
      if (isEnabled) {
        console.log('You are online')
      } else {
        showToast('This app opens your WiFi.')
        wifi.setEnabled(true);
      }
    });
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * Wag kayo maniwala, di naman gumagana to.
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      firebase.notifications().displayNotification(notification);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      firebase.notifications().displayNotification(notificationOpen);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      firebase.notifications().displayNotification(notificationOpen);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // save sa db?
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

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
