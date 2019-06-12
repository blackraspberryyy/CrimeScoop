import React, { Component } from "react";
import { startCase } from 'lodash'
import { FlatList, StyleSheet } from "react-native";
import { Container, Content, Text, ListItem, Icon, Body, Left, View, H2, H3 } from "native-base";
import firebase from 'react-native-firebase'
import navRoutes from '../../../navRoutes'
import misc from '../../styles/misc'

export default class SideBar extends Component {
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
  componentDidMount(){
    firebase
      .auth()
      .onAuthStateChanged(u => {
        this.setState(() => ({user_id: u.uid}))
        this.setUser()
      })
  }

  setUser(){
    const uid = this.state.user_id
    const Users = firebase.firestore().collection("Users")
    const query = Users.where("uid", "==", uid)

    query
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
        }else{
          const doc = querySnapshot.docs[0]
          this.setState(() => ({user: doc.data()}))
        }
      })
      .catch(e => {console.error(e)})
  }
  
  render() {
    const {user} = this.state
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
            }
          />
        </Content>
      </Container>
    );
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