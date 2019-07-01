import React, { Component } from 'react';
import { Container, Content, Button } from 'native-base';
import { View, Alert, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import MapView, { PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import MainHeader from '../components/Main/Header';
import misc from '../styles/misc';
import latLngObj from '../constants/maps/latLng'
import getCoordinates from '../tools/getCoordinates'
import getBarangay from '../tools/getBarangay'
import Geojson from 'react-native-geojson';
import geojsonObj from '../constants/maps/geojson'

export default class Dashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      location: null,
      region: {
        latitude: 14.5995,
        longitude: 120.9842,
        latitudeDelta: 0.03,
        longitudeDelta: 0.02,
      },
      coordinates: latLngObj,
      polygon: [{latitude: 0, longitude: 0}],
      geojson: {type:"featureCollection",features:[{type:"Feature", geometry:{type:"Point",coordinates:[120.981857,14.687221]},properties:{ID_0:177,ISO:"PHL",NAME_0:"Philippines",ID_1:47,NAME_1:"Metropolitan Manila",ID_2:966,NAME_2:"Valenzuela",ID_3:25811,NAME_3:"Karuhatan",NL_NAME_3:"",VARNAME_3:"",TYPE_3:"Barangay",ENGTYPE_3:"Village",PROVINCE:"Metropolitan Manila",REGION:"Metropolitan Manila"}}]},
      marginBottom: 0
    };
  }

  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged(user => {
      if (user && this._isMounted) {
        this.setState(() => ({ user_id: user.uid }))
      } else {
        this.props.navigation.navigate('Loading')
      }
    })
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    );
  };


  onMapReady = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(granted => {
      getCoordinates().then(e => {
        let coords = latLngObj
        coords.longitude = e.lon
        coords.latitude = e.lat
        this.setState({ coordinates: coords})
        this.setState(prevState => ({
          region: {
            ...prevState.region,
            latitude: coords.latitude,
            longitude: coords.longitude
          }
        }))

        getBarangay(e, true).then(res => {
          this.setState({ geojson: res });
          console.log(this.state.geoJson)
        })
      })

      this.setState({ marginBottom: 0 });
      
    });
  }

  render() {
    return (
      <Container>
        <MainHeader
          navigation={this.props.navigation}
          title="Dashboard"
        />
        <Content>
          <View style={{flex: 1, alignItems: 'center'}}>
            <MapView
              showsUserLocation={true}
              rotateEnabled={false}
              provider={PROVIDER_GOOGLE}
              style={[styles.map, {marginBottom: this.state.marginBottom}]}
              region={this.state.region}
              onMapReady={this.onMapReady}
            >
              <Geojson geojson={this.state.geojson}/>
            </MapView>
            <Text style={styles.dashboardHeader}>Are you in danger?</Text>
            <View style={{ marginTop: 30 }}>
              <Button 
                large
                primary
                style={styles.reportButton} 
                onPress={() => {showManila()}}
              >
                <Text style={[ misc.reportType, misc.catamaran ]}>Report</Text>
              </Button>
            </View>
          </View>

        </Content>
      </Container>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

}

const styles = StyleSheet.create({
  map: {
    height: 300,
    width: 400
  },
  reportButton:{
    width: 150, 
    justifyContent: 'center', 
    paddingBottom: 16
  },
  dashboardHeader: {
    fontSize: 58,
    fontFamily: 'Catamaran-ExtraBold',
    textAlign: 'center'
  }
})
