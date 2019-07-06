import React, { Component } from 'react';
import { RefreshControl, Alert } from 'react-native';
import { Container, Content, Text, List, ListItem, Thumbnail, Left, Right, Button, Icon, Body, Fab } from 'native-base'
import getDataWithProps from '../../tools/firestore/getDataWithProps'
import misc from '../../styles/misc'
import UsersModal from '../modals/UsersModal';
import AddUsersModal from '../modals/AddUserModal';
import userObj from '../../constants/user'

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
      addUserModalVisibility: false
    };
  }

  componentDidMount(){
    this.getUsers()
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
              {/* <Button 
                transparent
                onPress={() => {Alert.alert("Delete the Item")}}
              >
                <Icon 
                  name='trash' 
                  style={{ color: 'red' }} 
                />
              </Button> */}
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
