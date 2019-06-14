import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import GeoJsonGeometriesLookup from 'geojson-geometries-lookup'
import { Container, H2, Thumbnail, Button, Text } from 'native-base';
import misc from '../styles/misc'
import { isArray } from 'lodash';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // DO NOT REMOVE THIS PRECIOUS CODE!
  /* uploadBrgy = () => {
    const geojson = require('../../Barangays.json')
    
    const glookup = new GeoJsonGeometriesLookup(geojson, {ignorePoints: true, ignoreLines: true})

    const point = {type: "Point", coordinates: [120.97364544868468, 14.685320127468701]};
    let tmp = glookup.getContainers(point, {ignorePoints: true, ignoreLines: true})

    tmp.features.forEach(t => {
      console.log(t.properties.NAME_3)
    })
  } */

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
          {/* <Button
            style={styles.signup}
            onPress={this.uploadBrgy}
            block
          >
            <Text>Upload brgys</Text>
          </Button> */}
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