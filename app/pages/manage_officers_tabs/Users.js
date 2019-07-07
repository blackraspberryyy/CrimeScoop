import React, { Component } from 'react';
import firebase from 'react-native-firebase'
import { RefreshControl, Alert } from 'react-native';
import { Container, Content, Text, List, ListItem, Thumbnail, Left, Right, Button, Icon, Body, Fab } from 'native-base'
import getDataWithProps from '../../tools/firestore/getDataWithProps'
import misc from '../../styles/misc'
import UsersModal from '../modals/UsersModal';
import AddUsersModal from '../modals/AddUserModal';
import userObj from '../../constants/user'
import showToast from '../../tools/showToast'

export default class Reporters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selected: {
        data: userObj,
        id: ''
      },
      refreshing: false,
      userModalVisibility: false,
      addUserModalVisibility: false,
      currentUid: ''
    };
  }

  componentDidMount(){
    this.getUsers()
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({currentUid: user.uid})
      }
    })
  }

  getUsers = () => {
    getDataWithProps('Users', { role: this.props.role }).then(res => {
      this.setState({ users: res })
    })
  }

  onRefresh = async () => {
    await this.getUsers();
    await this.setState({ refreshing: false });
  }

  setModalVisibility = (bool) => {
    this.setState({userModalVisibility: bool})
  }

  setAddModalVisibility = (bool) => {
    this.setState({addUserModalVisibility: bool})
  }

  changeUser = (user, enabled) => {
    if(!enabled){
      // I'm Sorry
      enabled = false
    }

    let status = {status: 0}
    if(enabled){
      status = {status: 1}
    }else{
      status = {status: 0}
    }

    let ref = firebase.firestore().collection('Users').doc(user.id)
    ref.update(status).then(function() {
      showToast('User removed successfully.', 'success')
    })
    .catch(function(error) {
      showToast('Something went wrong', 'danger')
    }).finally(() => {
      this.onRefresh()
    })
  }

  render() {
    let content = <Text>Loading...</Text>
    if(this.state.users.length == 0){
      content = <Text>No Reporters</Text>
    }else{
      let defaultAvatar = "../../assets/CrimeScoop/default_avatar.jpg"
      
      content = this.state.users.map((user, key) => {
        let avatar = <Thumbnail source={ require(defaultAvatar) }/>
        if(user.data.avatar == ''){
          avatar = avatar
        }else{
          avatar = <Thumbnail source={{uri: user.data.avatar}}/>
        }

        return(
          <ListItem 
            thumbnail
            key={key}
            button={true}
            onPress={() => {
              this.setState({userModalVisibility: true})
              this.setState({selected: user})
            }}
          >
            <Left>
              { avatar }
            </Left>
            <Body>
              <Text>{user.data.fname} {user.data.lname}</Text>
              <Text style={misc.greyText}>{user.data.phone}</Text>
            </Body>
            <Right>
              { (this.state.currentUid != user.data.uid && user.data.status == 1) && (
                <Button 
                  transparent
                  onPress={() => {
                    Alert.alert(
                      'Delete ' + user.data.fname + ' ' + user.data.lname + '?',
                      'Are you sure you want to delete ' + user.data.fname + ' ' + user.data.lname + '?',
                      [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                        {text: 'OK', onPress: () => this.changeUser(user, false)},
                      ],
                      { cancelable: false }
                    )
                  }}
                >
                  <Icon 
                    name='trash'
                    style={{ color: 'red' }} 
                  />
                </Button>
              )}
              { (this.state.currentUid != user.data.uid && user.data.status == 0) && (
                <Button 
                  transparent
                  onPress={() => {
                    Alert.alert(
                      'Return ' + user.data.fname + ' ' + user.data.lname + '?',
                      'Are you sure you want to return ' + user.data.fname + ' ' + user.data.lname + '?',
                      [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                        {text: 'OK', onPress: () => this.changeUser(user, true)},
                      ],
                      { cancelable: false }
                    )
                  }}
                >
                  <Icon 
                    name='undo'
                    style={{ color: 'green' }} 
                  />
                </Button>
              )}
            </Right>
          </ListItem>
        )
      })
    }

    {/* Main Render */}
    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
        >
          <List>
            { content }
          </List>
        </Content>
        { this.state.userModalVisibility && 
          (<UsersModal
            visibility={this.state.userModalVisibility}
            user={this.state.selected}
            onClose={() => {
              this.setModalVisibility(false)
              this.onRefresh()
            }}
          />)
        }

        { this.state.addUserModalVisibility && 
          (<AddUsersModal
            role={this.props.role}
            visibility={this.state.addUserModalVisibility}
            user={this.state.selected}
            onClose={() => {
              this.setAddModalVisibility(false)
              this.onRefresh()
            }}
          />)
        }
        
        <Fab 
          position="bottomRight"
          onPress={() => {
            this.setState({addUserModalVisibility: true})
          }}
        >
          <Icon name='add'/>
        </Fab>
      </Container>
    );
  }
}
