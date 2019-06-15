import React, { Component } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import MainHeader from '../components/Main/Header';
import { Container, Content, Button } from 'native-base';
import misc from '../styles/misc';
// import manifest from './manifest.json';

// Retrieve Firebase Messaging object.
// const messaging = firebase.messaging();

export default class Dashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      location: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged(user => {
      if (user && this._isMounted) {
        this.setState(() => ({ user_id: user.uid }))
      } else {
        this.props.navigation.navigate('Loading')
      }
    })
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    );
  };


  render() {
    return (
      <Container>
        <MainHeader
          navigation={this.props.navigation}
          title="Dashboard"
        />
        <Content>
          <View style={misc.container}>
            {/* <Text>Location: {this.state.location}</Text> */}
            <Text style={styles.dashboardHeader}>Are you in danger?</Text>
            {/* <TouchableOpacity onPress={this.findCoordinates}>
              <Text>Find My Coords?</Text>
            </TouchableOpacity> */}
            <View style={{ marginTop: 30 }}>
              <Button large primary style={{ width: 150, justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 25 }}>Report</Text>
              </Button>
            </View>
          </View>

        </Content>
      </Container>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

}
