import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container, Content, Text, List, ListItem, Thumbnail, Left, Right, Button, Icon, Body } from 'native-base'
import getDataWithProps from '../../tools/firestore/getDataWithProps'
import misc from '../../styles/misc'

export default class Reporters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      refreshing: false
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

  render() {
    let content = <Text>Loading...</Text>
    if(this.state.users.length == 0){
      content = <Text>No Reporters</Text>
    }else{
      let defaultAvatar = "../../assets/CrimeScoop/default_avatar.jpg"
      let avatar = <Thumbnail source={ require(defaultAvatar) }/>
      
      content = this.state.users.map((user, key) => {
        if(user.data.avatar == ''){
          avatar = avatar
        }else{
          avatar = <Thumbnail source={{uri: user.data.avatar}}/>
        }

        return(
          <ListItem thumbnail key={key}>
            <Left>
              { avatar }
            </Left>
            <Body>
              <Text>{user.data.fname} {user.data.lname}</Text>
              <Text style={misc.greyText}>{user.data.phone}</Text>
            </Body>
            <Right>
              <Button transparent>
                <Icon 
                  name='create' 
                  style={misc.accentText} 
                />
              </Button>
              <Button transparent>
                <Icon 
                  name='trash' 
                  style={{ color: 'red' }} 
                />
              </Button>
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
          }>
          <List>
            { content }
          </List>
        </Content>
      </Container>
    );
  }
}
