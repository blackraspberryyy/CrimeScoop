import React, { Component } from 'react';
import { Container, Content, CardItem, Thumbnail, Text, Button, Icon, Right, View, Left, Fab, Footer } from 'native-base';
import { TouchableOpacity, Modal, RefreshControl } from 'react-native'
import MainHeader from '../components/Main/Header';
import getDataWithProps from '../tools/firestore/getDataWithProps';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import AddCriminalModal from './modals/AddCriminalModal';
import ViewCriminalModal from './modals/ViewCriminalModal';
import firebase from 'react-native-firebase';

export default class NotoriousCriminals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criminals: [],
      selectedCriminal: [],
      role: '',
      isViewModalVisible: false,
      isConfirmDeleteVisible: false,
      isAddCriminalVisible: false,
      isEditCriminalVisible: false
    };
  }

  componentDidMount = () => {
    this.getNotoriousCriminals();
    this.getRole();
  }

  changeAddCriminalVisibility = (bool) => {
    this.setState({ isAddCriminalVisible: bool });
  }

  changeEditCriminalVisibility = (bool) => {
    this.setState({ isEditCriminalVisible: bool });
  }

  changeConfirmDeleteVisibility = (bool) => {
    this.setState({ isConfirmDeleteVisible: bool });
  }

  changeViewModalVisibility = (bool) => {
    this.setState({ isViewModalVisible: bool });
  }

  getNotoriousCriminals = () => {
    getDataWithProps('NotoriousCriminals', { status: 1 }).then(res => {
      this.setState({ criminals: res })
    })
  }

  getSelectedCriminal(data) {
    this.setState({ selectedCriminal: data })
  }

  onRefresh = async () => {
    await this.getNotoriousCriminals();
    await this.setState({ refreshing: false });
  }

  getRole = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid
        getDataWithProps('Users', { uid: uid }).then(res => {
          currentUser = res[0].data
          this.setState({ role: currentUser.role })
        })
      }
    });
  }

  render() {
    let criminals = this.state.criminals;
    return (
      <Container>
        <MainHeader
          navigation={this.props.navigation}
          title="Criminals"
        />
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {
              criminals.map((criminal, key) => {
                return (
                  <TouchableOpacity style={{ margin: 3, width: '48%', borderColor: 'grey', borderWidth: 1 }} key={key} onPress={() => [this.changeViewModalVisibility(true), this.getSelectedCriminal(criminal.data)]}>
                    <CardItem cardBody >
                      {criminal.data.upload == '' ? <Thumbnail square source={require('../assets/user-placeholder.jpg')} style={{ height: 125, width: null, flex: 1 }} />
                        : <Thumbnail square source={{ uri: criminal.data.upload }} style={{ height: 125, width: null, flex: 1 }} />}
                    </CardItem>
                    <CardItem style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20 }}>{criminal.data.fname} {criminal.data.lname}</Text>
                    </CardItem>
                    {
                      (this.state.role == 'police_officer' || this.state.role == 'superadmin') &&
                      <CardItem footer style={{ height: 25 }}>
                        <Left>
                          <Button transparent onPress={() => [this.changeEditCriminalVisibility(true), this.getSelectedCriminal(criminal)]}>
                            <Icon name="create"></Icon>
                          </Button>
                        </Left>
                        <Right>
                          <Button transparent onPress={() => [this.changeConfirmDeleteVisibility(true), this.getSelectedCriminal(criminal)]}>
                            <Icon name='trash' style={{ color: 'red' }} />
                          </Button>
                        </Right>
                      </CardItem>
                    }
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <Modal
            transparent={true}
            visible={this.state.isViewModalVisible}
            onRequestClose={() => this.changeViewModalVisibility(false)}
            animationType='fade'
          >
            <ViewCriminalModal
              changeModalVisibility={this.changeViewModalVisibility}
              criminal={this.state.selectedCriminal}
            />
          </Modal>
          <Modal
            transparent={true}
            visible={this.state.isConfirmDeleteVisible}
            onRequestClose={() => this.changeConfirmDeleteVisibility(false)}
            animationType='fade'
          >
            <ConfirmDeleteModal
              changeDeleteVisibility={this.changeConfirmDeleteVisibility}
              criminal={this.state.selectedCriminal}
              onReport={this.onRefresh}
            />
          </Modal>

          <Modal
            transparent={true}
            visible={this.state.isAddCriminalVisible}
            onRequestClose={() => this.changeAddCriminalVisibility(false)}
            animationType='fade'
          >
            <AddCriminalModal
              mode="add"
              changeAddCriminalVisibility={this.changeAddCriminalVisibility}
              onReport={this.onRefresh}
            />
          </Modal>
          
          <Modal
            transparent={true}
            visible={this.state.isEditCriminalVisible}
            onRequestClose={() => this.changeEditCriminalVisibility(false)}
            animationType='fade'
          >
            <AddCriminalModal
              mode="edit"
              changeEditCriminalVisibility={this.changeEditCriminalVisibility}
              criminal={this.state.selectedCriminal}
              onReport={this.onRefresh}
            />
          </Modal>
        </Content>
          { (this.state.role == 'police_officer' || this.state.role == 'superadmin') &&
            <Footer style={{backgroundColor: 'transparent'}}>
              <Fab
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => this.changeAddCriminalVisibility(true)}
              >
                <Icon name="add" />
              </Fab>
            </Footer>
          }
      </Container>
    );
  }
}
