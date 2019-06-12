import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, H2, Thumbnail, Button, Text } from 'native-base';
import misc from '../styles/misc'

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  login = () => {
    this.props.navigation.navigate("Login")
  }

  signup = () => {
    this.props.navigation.navigate("SignUp")
  }

  render() {
    const logoUrl="../assets/CrimeScoop/logo.png"
    return (
      <Container style={misc.container}>
        <H2>Welcome to</H2>
        <Thumbnail 
          style={ {width: 300, height: 80} }
          source={ require(logoUrl) }
        />
        <Button
          style={styles.signin}
          onPress={this.login}
          rounded
          block
        >
          <Text>Login</Text>
        </Button>
        <View style={{ marginTop: 88 }}>
          <Text style={misc.greyText}>Haven't created an account yet?</Text>
          <Button
            style={styles.signup}
            onPress={this.signup}
            light
            block
            rounded
          >
            <Text>Sign Up to CrimeScoop</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

// styles
const styles = StyleSheet.create({
  signin: {
    marginTop: 24,
    marginHorizontal: 64
  },
  signup: {
    marginTop: 8
  }
})