import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, H2, Thumbnail, Button, Text } from 'native-base';
import misc from '../styles/misc'

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // uploadBrgy = () => {
  //   const barangays = firebase.firestore().collection("barangays")
  //   console.log('getting json..')
  //   let brgys = require('../../sample.json')
  //   console.log(brgys.type)

  //   let brgyFeatures = brgys.features

  //   brgyFeatures.forEach(brgy => {
  //     console.log(brgy)
  //     barangays.add({
  //       type: brgy.type,
  //       properties: brgy.properties,
  //       geometry: JSON.stringify(brgy.geometry)
  //     }).then(docRef => {
  //       console.log("Wala ba talaga?")
  //       console.log("Document written with ID: ", docRef.id);
  //     }).catch(error => {
  //       console.error("Error adding document: ", error);
  //     });
  // });
  // }

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
          block
        >
          <H2 style={[misc.catamaran, misc.whiteText]}>Login</H2>
        </Button>
        <View style={{ marginTop: 88 }}>
          <Text style={misc.greyText}>Haven't created an account yet?</Text>
          <Button
            style={styles.signup}
            onPress={this.signup}
            light
            block
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
    marginHorizontal: 64,
    paddingTop: 28,
    paddingBottom: 16
  },
  signup: {
    marginTop: 8
  }
})