import React, { Component } from 'react';
import { capitalize } from 'lodash'
import { Modal, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Thumbnail, Content, Form, Item, Input, Text, View, Header, Body, Left, Right, Title, Button, Icon} from 'native-base';
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-picker';
import modalStyle from '../../styles/modal'
import userObj from '../../constants/user'
import checkPhoneNumberFormat from '../../tools/checkPhoneNumberFormat';
import showToast from '../../tools/showToast';
import BrgyPicker from '../../components/Main/BrgyPicker';

export default class UsersModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'view', //can be edit
      visibility: false,
      user: {
        data: userObj,
        id: ''
      },
      fname: '',
      lname: '', 
      phone: '',
      avatar: '',
      imageName: '',
      brgys:[]
    };
  }

  componentDidMount(){
    this.setState({fname: this.props.user.data.fname})
    this.setState({lname: this.props.user.data.lname})
    this.setState({phone: this.props.user.data.phone})
    this.setState({role: this.props.user.data.role})
    this.setState({brgys: this.props.user.data.brgys ? this.props.user.data.brgys : []})
    this.setState({visibility: this.props.visibility})
  }

  static getDerivedStateFromProps = (nextProps) => {
    return { user: nextProps.user }
  }

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let uri = { uri: response.uri };
        this.setState({ avatar: uri });
        this.setState({ imageName: response.fileName });
      }
    });
  }

  resetValues = () => { // before closing, reset the values
    this.setState({fname: ''})
    this.setState({lname: ''})
    this.setState({phone: ''})
    this.setState({avatar: ''})
    this.setState({brgys: []})
    this.props.onClose()
  }

  changeUser = () => {
    if(this.state.mode == 'view'){
      this.resetValues()
    }else if(this.state.mode == 'edit'){
      if (!checkPhoneNumberFormat(this.state.phone)){
        showToast('Mobile Phone has an invalid format.', 'danger')
        return
      }

      let downloadUrl = ''
      if(this.state.avatar != ''){
        // save avatar picked to storage
        const imageRef = firebase.storage().ref('avatars').child(this.state.imageName);
        imageRef.putFile(this.state.avatar.uri)
          .then(() => {
            downloadUrl = imageRef.getDownloadURL();
            return imageRef.getDownloadURL();
          })
          .then(url => {
            downloadUrl = url
            this.updateUser(this.state.fname, this.state.lname, this.state.phone, downloadUrl)
          })
          .catch(error => {
            console.log('Error uploading image: ', error);
          })
          .finally(() => {
            this.resetValues()
          })
      }else{
        this.updateUser(this.state.fname, this.state.lname, this.state.phone)
        this.resetValues()
      }
    }
  }

  updateUser = (fname, lname, phone, avatar) => {
    let updateObj = {
      fname: fname,
      lname: lname,
      phone: phone
    }

    if(avatar){
      updateObj['avatar'] = avatar
    }

    if(this.state.role == 'brgy_officer' || this.state.role == 'police_officer'){
      updateObj.brgys = this.state.brgys
    }

    let ref = firebase.firestore().collection('Users').doc(this.state.user.id)
    ref.update(updateObj)
    .then(function() {
      showToast('User successfully edited.', 'success')
    })
    .catch(function(error) {
      showToast('Something went wrong', 'danger')
      // The document probably doesn't exist.
      console.log("Error updating document: ", error);
    });

  }

  toggleMode = () => {
    let s = this.state.mode == 'view' ? 'edit' : 'view'
    this.setState({mode: s})
  }

  render() {
    let disabled = this.state.mode == 'view' ? true : false 
    let icon = this.state.mode == 'view' ? 'create' : 'eye' 

    let defaultAvatar = "../../assets/CrimeScoop/default_avatar.jpg"
    let avatar = <Thumbnail large source={ require(defaultAvatar) }/>

    if(this.state.avatar != ''){
      avatar = <Thumbnail large source={this.state.avatar}/>
    }else{
      if(this.state.user.data.avatar != ''){
        avatar = <Thumbnail large source={{uri: this.state.user.data.avatar}}/>
      }else{
        avatar = avatar //use default
      }
    }

    let form = this.state.fname && 
      this.state.lname 
      
    renderBrgys = this.state.brgys.map((e, key) => (<Text key={key}>{'-' + e}</Text>))

    return (
      <Modal
        transparent={true}
        visible={this.state.visibility}
        onRequestClose={() => this.resetValues()}
        animationType='fade'
      >
        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View style={{ backgroundColor: '#fff', marginHorizontal: 24, borderRadius: 10}}>
            <Header>
              <Left>
                <Icon 
                  name='person' 
                  style={{color: '#fff'}}
                />
              </Left>
              <Body>
                <Title>{capitalize(this.state.mode)} User</Title>
              </Body>
              <Right>
                <Button 
                  transparent 
                  onPress={() => this.toggleMode()}
                >
                  <Icon 
                    name={icon} 
                    style={{color: '#fff'}}
                  />
                </Button>
              </Right>
            </Header>
            <Form style={[styles.form, {paddingVertical: 32}]}>
              <View style={{alignItems: 'center', marginBottom: 24}}>
                <TouchableOpacity 
                  onPress={this.selectPhotoTapped}
                  disabled={disabled}
                >
                  { avatar }
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row'}}>
                <Item 
                  disabled={disabled}
                  rounded 
                  style={[styles.input, styles.colInput, {marginRight: 8}]}
                >
                  <Input
                    autoFocus={true}
                    disabled={disabled}
                    style={ styles.inputFontSize }
                    placeholder='Firstname'
                    onChangeText={fname => {this.setState({fname})}}
                    defaultValue={this.state.user.data.fname}
                    />
                </Item>
                <Item
                  disabled={disabled}
                  rounded 
                  style={[styles.input, styles.colInput, {marginLeft: 8}]}
                >
                  <Input
                    disabled={disabled}
                    style={ styles.inputFontSize }
                    placeholder='Lastname'
                    onChangeText={lname => this.setState({lname})}
                    defaultValue={this.state.user.data.lname}                  
                  />
                </Item>
              </View>
              { (this.state.role == 'brgy_officer' || this.state.role == 'police_officer')  && (
                <View style={{marginTop: 24, marginHorizontal: 8}}>
                  <Text>Duties on:</Text>
                  { this.state.mode == 'edit' && (
                    <BrgyPicker
                      selectedItem={this.state.brgys}
                      onPick={ items => this.setState({brgys: items}) } 
                      single={ this.state.role == 'brgy_officer' ? true : false}
                    />
                  )}
                  { this.state.mode == 'view' && renderBrgys }
                </View>
              )}
              <Item
                disabled={disabled}
                rounded 
                style={[styles.input, {marginTop: 24}]}
              >
                <Input 
                  disabled={disabled}
                  style={ styles.inputFontSize }
                  placeholder='Phone'
                  keyboardType='numeric'
                  onChangeText={phone => this.setState({phone})}
                  defaultValue={this.state.user.data.phone}                                  
                  />
              </Item>
            </Form>
            <View style={modalStyle.buttonView}>
              <TouchableHighlight 
                onPress={() => this.resetValues()} 
                style={[modalStyle.touchableHighlight, { borderBottomLeftRadius: 10, borderRightColor: 'grey', borderRightWidth: 1 }]} 
                underlayColor={'#f1f1f1'}
              >
                <Text style={[modalStyle.textModal, { color: 'blue' }]}>Cancel</Text>
              </TouchableHighlight>
              {this.state.mode == 'edit' && (
                <TouchableHighlight
                  disabled={ !form }
                  onPress={() => this.changeUser()} 
                  style={[modalStyle.touchableHighlight, { borderBottomRightRadius: 10 }]} 
                  underlayColor={'#f1f1f1'}
                >
                  <Text style={[modalStyle.textModal, { color: !form ? '#ccc' : 'blue' }]}>Save Changes</Text>
                </TouchableHighlight>
              )}
            </View>
          </View>
        </Content>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 24
  },
  input: {
    backgroundColor: '#EFEFEF'
  },
  inputFontSize: {
    fontSize: 16
  },
  colInput: {
    flex: 1
  }
})