import React, { Component } from 'react';
import MainHeader from '../components/Main/Header';
import { Container } from 'native-base';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Dashboard'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  goBack(){
    const { navigate } = this.props.navigation;
    navigate("Loading")
  }

  render() {
    return (
      <Container>
        <MainHeader 
          title="Login"
          onButtonPress={() => this.goBack()}
          backIcon
        />

      </Container>
    );
  }
}
