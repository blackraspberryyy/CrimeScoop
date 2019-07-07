import React, { Component } from 'react';
import { Container, Content, Button, H1, Item, Input, H3 } from 'native-base';
import { View, Alert, Text, StyleSheet, PermissionsAndroid, Dimensions, RefreshControl } from 'react-native';
import firebase from 'react-native-firebase';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geojson from 'react-native-geojson';
import center from '@turf/center'
import MainHeader from '../components/Main/Header';
import misc from '../styles/misc';
import latLngObj from '../constants/maps/latLng'
import getCoordinates from '../tools/getCoordinates'
import getBarangay from '../tools/getBarangay'
import getDataWithProps from '../tools/firestore/getDataWithProps'
import BrgyDropdown from '../components/Main/BrgyDropdown'
import getBarangayByName from '../tools/getBarangayByName';


export default class Dashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      location: null,
      user: null,
      role: 'reporter',
      initialRegion: {
        latitude: 14.5995,
        longitude: 120.9842,
        latitudeDelta: 0.03,
        longitudeDelta: 0.02,
      },
      region: {
        latitude: 14.5995,
        longitude: 120.9842,
        latitudeDelta: 0.03,
        longitudeDelta: 0.02,
      },
      population: 0,
      crimesInBrgy: 0,
      coordinates: latLngObj,
      barangay: 'Loading...',
      geojson: {type:"featureCollection",features:[{type:"Feature", geometry:{type:"Point",coordinates:[120.981857,14.687221]},properties:{ID_0:177,ISO:"PHL",NAME_0:"Philippines",ID_1:47,NAME_1:"Metropolitan Manila",ID_2:966,NAME_2:"Valenzuela",ID_3:25811,NAME_3:"Karuhatan",NL_NAME_3:"",VARNAME_3:"",TYPE_3:"Barangay",ENGTYPE_3:"Village",PROVINCE:"Metropolitan Manila",REGION:"Metropolitan Manila"}}]},
      marginBottom: 0,
      refreshing: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setRole()
    firebase.auth().onAuthStateChanged(user => {
      if (user && this._isMounted) {
        this.setState(() => ({ user_id: user.uid }))
      } else {
        this.props.navigation.navigate('Loading')
      }
    })
  }

  setRole(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid
        getDataWithProps('Users', { uid: uid }).then(res => {
          if(this._isMounted){
            this.setState({role: res[0].data.role})
            this.setState({user: res[0].data})
          }
        })
      }
    })
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        if(this._isMounted){
          this.setState({ location });
        }
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    );
  };

  onMapReady = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(granted => {
      if(this._isMounted){
        getCoordinates().then(e => {
          let coords = {}
          coords['latitude'] = e.lat
          coords['longitude'] = e.lon
          this.setState(prevState => ({
            coordinates: {  
              latitude: coords.latitude,
              longitude: coords.longitude
            }
          }))
          this.setState(prevState => ({
            region: {
              ...prevState.region,
              latitude: coords.latitude,
              longitude: coords.longitude
            }
          }))
          getBarangay(e, true).then(res => {
            this.setState({ geojson: res })
            this.onRefresh()
          })
        })
        this.setState({ marginBottom: 0 });
      }
    });
  }

  getGeoJson(brgyName){
    getBarangayByName(brgyName).then(e => {
      if(this._isMounted){
        this.setState({geojson: e})
        this.onRefresh()
      }
    }).catch(err => { console.log(err) })
  }

  onRefresh = () =>{
    if(this._isMounted){
      let e = this.state.geojson
      this.setState({barangay: e.features[0].properties.NAME_3})
      this.setState({ population: e.features[0].properties.POPULATION ? e.features[0].properties.POPULATION : 0 })
      getDataWithProps('Reports').then(element => {
        let crimesInBrgy = 0
        let reports = element.map(e => e.data)
        reports.forEach(report => {
          if(report.barangay == e.features[0].properties.NAME_3){
            crimesInBrgy = crimesInBrgy + 1
          }
        })
        this.setState({ crimesInBrgy: crimesInBrgy})
        let centerPoint = center(e.features[0])
        let coords = {
          longitude: centerPoint.geometry.coordinates[0], 
          latitude: centerPoint.geometry.coordinates[1]
        }
        let cameraObj = {
          center: coords,
          pitch: 5,
          heading: 5
        }
        this.mapView.animateCamera(cameraObj, {duration: 5000})
        this.setState(prevState => ({
          region: {
            ...prevState.region,
            latitude: coords.latitude,
            longitude: coords.longitude
          }
        }))
        this.setState({coordinates: coords})
      })
    }
  }

  render() {
    let crimeRate = 0
    if(this.state.population == 0){
      crimeRate = 'N/A'
    }else{
      crimeRate = ( this.state.crimesInBrgy / this.state.population ) * 100000
      crimeRate = Math.round(crimeRate * 100) / 100
    }
    return (
      <Container>
        <MainHeader
          navigation={this.props.navigation}
          title="Dashboard"
        />
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.onRefresh()
                this.setState({refreshing: false})
              }}
            />
          }
        >
          <View style={[misc.container, {paddingHorizontal: 16, paddingTop: 8, marginBottom: 16}]}>
            <Text style={[misc.greyText, {marginBottom: 16}]}>You're currently looking at Barangay</Text>
            { (this.state.role == 'reporter' || this.state.role == 'brgy_officer') && (
              <Item rounded style={{marginBottom: 24}}>
                <Input
                  disabled
                  value={this.state.barangay} 
                  textAlign='center'
                />
              </Item>
            )}

            { (this.state.role == 'police_officer' || this.state.role == 'superadmin') && (
              <View style={{marginBottom: 24}}>
                <BrgyDropdown
                  selected={this.state.barangay}
                  onPick={e => this.getGeoJson(e)}
                />
              </View>
            )}
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={[misc.centerAlign, {marginTop: 16}]}>Crime Rate in this Barangay</Text>
              <H1 style={{fontSize: 32}}>{crimeRate}</H1>
              <Text style={[misc.blackText, {fontSize: 16}]}> / per 100,000 people</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 24}}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16}}>
                <Text style={[misc.centerAlign, {height: 48}]}>No. Crime Reports in this Barangay</Text>
                <H1>{this.state.crimesInBrgy}</H1>
                <Text style={[misc.blackText, {fontSize: 16}]}>Crime Reports</Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16}}>
                <Text style={[misc.centerAlign, {height: 48}]}>Population in this Barangay</Text>
                <H1 style={{fontSize: 32}}>{this.state.population == 0 ? 'N/A' : this.state.population}</H1>
                <Text style={[misc.blackText, {fontSize: 16}]}> residents</Text>
              </View>
            </View>
          </View>
          <MapView
            rotateEnabled={false}
            provider={PROVIDER_GOOGLE}
            style={[styles.map, {marginBottom: this.state.marginBottom}]}
            region={this.state.region}
            initialRegion={this.state.initialRegion}
            onMapReady={this.onMapReady}
            ref={e => this.mapView = e}
          >
            <Geojson 
              geojson={this.state.geojson}
              strokeColor='#4169E1'
              strokeWidth={2}
              fillColor='rgba(65,105,225,0.5)'
            />
            <Marker
              coordinate={this.state.coordinates}
              title={this.state.barangay}
            />
          </MapView>
          
          { (this.state.role == 'brgy_officer' || this.state.role == 'police_officer') && (
              <View style={{marginVertical: 24, marginHorizontal: 40}}>
                <H3>Duties on:</H3>
                { (this.state.user && this.state.user.brgys) && this.state.user.brgys.map((e, key) => {
                  return (
                    <Text key={key}>- {e}</Text>
                  )
                })}
              </View>
            )}
          {/* <View
            style={{
              marginTop:32,
              borderBottomColor: '#515151',
              marginHorizontal: 96,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={{ marginBottom: 32, alignItems: 'center' }}>
            <H1 style={[misc.catamaran, {paddingTop: 32, fontSize: 32}]}>Are you in danger?</H1>
            <View style={{ marginTop: 16 }}>
              <Button 
                large
                primary
                style={styles.reportButton}
              >
                <Text style={[ misc.reportType, misc.catamaran ]}>Report</Text>
              </Button>
            </View>
          </View> */}

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
    width: Dimensions.get('window').width,
    alignSelf: 'stretch'
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
