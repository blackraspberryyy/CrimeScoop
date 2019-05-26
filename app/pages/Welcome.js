import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, H2, Thumbnail, Button, Text } from 'native-base';
import misc from '../styles/misc'

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const logoUrl="../assets/CrimeScoop/logo.png"
    return (
      <Container style={misc.container}>
        <H2>Welcome to</H2>
        <Thumbnail 
          style={ {width: 400, height: 80} }
          source={ require(logoUrl) }
        />
        <Button
          style={styles.signin}
          block
        >
          <Text>Login</Text>
        </Button>
        <View style={{ marginTop: 72 }}>
          <Text style={misc.greyText}>Haven't created an account yet?</Text>
          <Button
            style={styles.signup}
            bordered
            block
          >
            <Text style={misc.accentText}>Sign Up to CrimeScoop</Text>
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
    marginHorizontal: 32,
    backgroundColor: '#4169E1'
  },
  signup: {
    marginTop: 8,
    backgroundColor: '#FFF'
  }
})