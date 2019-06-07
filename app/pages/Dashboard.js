import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: ''
    };
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState(() => ({user_id: user.uid}))
    })
  }

  render() {
    return (
      <View>
        <Text>HEY</Text>
        <Text>{this.state.user_id}</Text>
      </View>
    );
  }
}
