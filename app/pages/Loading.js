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
        this.props.navigation.navigate(user ? 'AppDrawer' : 'Welcome')
      })
    }, 300)
  }

  render() {
    const logoUrl="../assets/CrimeScoop/icon.png"
    return (
        <View style={ misc.container }>
          <Thumbnail 
            style={ {width: 150, height: 50} }
            source={ require(logoUrl) }
          />
          <Spinner color="#4169e1"/>
        </View>
    );
  }
}
