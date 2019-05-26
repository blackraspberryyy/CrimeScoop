import React, { Component } from 'react'
import { View } from 'react-native'
import { Spinner, Thumbnail } from 'native-base'
import firebase from 'react-native-firebase'
import misc from '../styles/misc'

export default class Loading extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Dashboard' : 'Welcome')
      })
    }, 1000)
  }

  render() {
    const logoUrl="../assets/CrimeScoop/logo.png"
    return (
        <View style={ misc.container }>
          <Thumbnail 
            style={ {width: 300} }
            source={ require(logoUrl) }
          />
          <Spinner color="#4169e1"/>
        </View>
    );
  }
}
