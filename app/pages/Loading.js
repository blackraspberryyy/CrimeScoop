import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { Spinner, Thumbnail } from 'native-base';

export default class componentName extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const logoUrl="../assets/CrimeScoop/logo.png"
    return (
        <View style={ styles.container }>
          <Thumbnail 
            style={ {width: 300} }
            source={ require(logoUrl) }
          />
          <Spinner color="#4169e1"/>
        </View>
    );
  }
}

// style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})