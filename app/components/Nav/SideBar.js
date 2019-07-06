import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import { startCase } from 'lodash'
import { Container, Content, Text, ListItem, Icon, Body, Left, View, H2, Thumbnail } from "native-base";
import firebase from 'react-native-firebase'
import navRoutes from '../../../navRoutes'
import misc from '../../styles/misc'
import showToast from "../../tools/showToast";
import getDataWithProps from "../../tools/firestore/getDataWithProps";

export default class SideBar extends Component {
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      user_id: '',
      user: {
        fname: '',
        lname: '',
        role: 'reporter'
      }
    };

  }

  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      showToast("Successfully Logout", "success")
      this.props.navigation.navigate('Login');
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount(){
    this._isMounted = true;
    firebase.auth()
      .onAuthStateChanged(u => {
        if (u && this._isMounted){
          this.setUser(u)
        }else{
          this.props.navigation.navigate('Loading')
        }
      })
  }

  setUser(user){
    const uid = user.uid
    this.setState({user_id: uid})

    getDataWithProps('Users', {uid: uid}).then(result => {
      if(result[0] && result[0].data.length == 0){
        showToast('No users found', 'danger')
      }else{
        if(this._isMounted){
          let res = result[0].data
          this.setState({user: res})
          showToast('Welcome ' + startCase(res.fname + ' ' + res.lname) + '!', 'success')
        }
      }
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    let { user } = this.state

    let defaultAvatar = "../../assets/CrimeScoop/default_avatar.jpg"
    let avatar = <Thumbnail source={ require(defaultAvatar) }/>
    if(user && user.avatar && user.avatar == ''){
      //do nothing
    }else{
      avatar = <Thumbnail source={{uri: user.avatar}}/>
    }

    return (
      <Container>
        <Content>
          <View style={styles.navHeader}>
            { avatar }
            <H2 style={{marginTop: 8, fontWeight: 'bold'}}>{startCase(user.fname + ' ' + user.lname)}</H2>
            <Text style={misc.greyText}>{startCase(user.role)}</Text>
          </View>
          <FlatList
            data={navRoutes}
            extraData={this.state}
            renderItem={( { item } ) => {
              if(item.auth.indexOf(user.role) > -1){
                return (
                  <ListItem
                    noBorder
                    icon
                    button
                    onPress={() => {
                      this.props.navigation.closeDrawer()
                      this.props.navigation.navigate(item.route)
                    }}>
                      <Left>
                        <Icon 
                          name={item.icon}
                          style={misc.blackText}
                        />
                      </Left>
                      <Body>
                        <Text>{item.key}</Text>
                      </Body>
                      
                  </ListItem>
                )
              }
            }}/>
            <ListItem
              noBorder
              icon
              button
              onPress={() => {
                this.signOutUser()
                this.props.navigation.navigate('Loading')
              }}>
                <Left>
                  <Icon 
                    name='log-out'
                    style={misc.blackText}
                  />
                </Left>
                <Body>
                  <Text>Logout</Text>
                </Body>
            </ListItem>
        </Content>
      </Container>
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
}

const styles = StyleSheet.create({
  navHeader: {
    marginTop: 24,
    padding: 8,
    height: 180,
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-start'
  }
})