import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase'
import MainHeader from '../components/Main/Header';
import {Container, Content} from 'native-base'

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
      <Container>
        <MainHeader 
          navigation={this.props.navigation}
          title="Dashboard"
        />
        <Content>
          <Text>Hello There</Text>
        </Content>
      </Container>
    );
  }
}
