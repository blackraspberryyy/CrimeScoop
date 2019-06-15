import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import { startCase } from 'lodash'
import { Container, Content, Text, ListItem, Icon, Body, Left, View, H2, H3 } from "native-base";
import firebase from 'react-native-firebase'
import navRoutes from '../../../navRoutes'
import misc from '../../styles/misc'
import showToast from "../../tools/showToast";

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
    firebase
      .auth()
      .onAuthStateChanged(u => {
        if (u && this._isMounted){
          this.setUser(u)
        }else{
          this.props.navigation.navigate('Loading')
        }
      })
  }

  setUser(user){
    this.setState(() => ({user_id: user.uid}))

    const uid = user.uid
    const Users = firebase.firestore().collection("Users")
    const query = Users.where("uid", "==", uid)

    query
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          showToast('No users found', 'danger')
        }else{
          if(this._isMounted){
            const doc = querySnapshot.docs[0]
            this.setState(() => ({user: doc.data()}))
  
            const {user} = this.state
            showToast('Welcome ' + startCase(user.fname + ' ' + user.lname) + '!', 'success')
          }
        }
      })
      .catch(e => {console.error(e)})
  }
  
  render() {
    const { user } = this.state
    return (
      <Container>
        <Content>
          <View
            style={styles.navHeader}
          >
            <H2 style={{fontWeight: 'bold'}}>{startCase(user.fname + ' ' + user.lname)}</H2>
            <Text style={misc.greyText}>{startCase(user.role)}</Text>
          </View>
          <FlatList
            data={navRoutes}
            renderItem={({item}) => 
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
            }/>
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
    height: 160,
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-start'
  }
})