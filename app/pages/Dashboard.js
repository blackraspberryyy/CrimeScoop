import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase'
import MainHeader from '../components/Main/Header';
import {Container, Content} from 'native-base'

export default class Dashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user_id: ''
    };
  }

  componentDidMount(){
    this._isMounted = true;
    firebase.auth().onAuthStateChanged(user => {
      if(user && this._isMounted){
        this.setState(() => ({user_id: user.uid}))
      }else{
        this.props.navigation.navigate('Loading')
      }
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

  componentWillUnmount() {
    this._isMounted = false;
  }
}
