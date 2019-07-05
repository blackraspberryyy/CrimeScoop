import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Thumbnail, Content, Form, Item, Input, Text, View, Header, Body, Left, Right, Title, Button, Icon} from 'native-base';
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-picker';
import validator from 'validator';
import modalStyle from '../../styles/modal'

export default class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fname: '',
      lname: '',
      phone: '',
      avatar: '',
      imageName: ''
    };
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
    this.setState({email: ''})
    this.setState({password: ''})
    this.props.onClose()
  }

  addUser = () => {
    console.log("Add User")
  }

  render() {
    const s = this.state

    let defaultAvatar = "../../assets/CrimeScoop/default_avatar.jpg"
    let avatar = <Thumbnail large source={ require(defaultAvatar) }/>

    if(this.state.avatar != ''){
      avatar = <Thumbnail large source={this.state.avatar}/>
    }else{
      avatar = avatar //use default
    }

    let form = s.email &&
      validator.isEmail(s.email) &&
      s.password &&
      s.fname &&
      s.lname

      
    let role = 'Reporter'
    if(this.props.role == 'brgy_officer'){
      role = 'Brgy. Officer'
    }else if(this.props.role == 'police_officer'){
      role = 'Police Officer'
    }else if(this.props.role == 'superadmin'){
      role = 'Super Admin'
    }else{
      role = role
    }

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
                <Title>{role}</Title>
              </Body>
              <Right style={{border: 1}}/>
            </Header>
            <Form style={[styles.form, {paddingVertical: 32}]}>
              <View style={{alignItems: 'center', marginBottom: 24}}>
                <TouchableOpacity onPress={this.selectPhotoTapped}>
                  { avatar }
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row'}}>
                <Item 
                  rounded 
                  style={[styles.input, styles.colInput, {marginRight: 8}]}
                >
                  <Input
                    autoFocus={true}
                    style={ styles.inputFontSize }
                    placeholder='Firstname'
                    onChangeText={fname => {this.setState({fname})}}
                  />
                </Item>
                <Item
                  rounded 
                  style={[styles.input, styles.colInput, {marginLeft: 8}]}
                >
                  <Input
                    style={ styles.inputFontSize }
                    placeholder='Lastname'
                    onChangeText={lname => this.setState({lname})}
                  />
                </Item>
              </View>
              <Item 
                rounded 
                style={[styles.input, {marginTop: 24}]}
              >
                <Input
                  style={ styles.inputFontSize }
                  autoCapitalize="none"
                  placeholder='Email'
                  keyboardType='email-address'
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item 
                rounded 
                style={[styles.input, {marginTop: 24}]}
              >
                <Input 
                  style={ styles.inputFontSize }
                  placeholder='Password' 
                  autoCapitalize="none"
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
              <Item 
                rounded 
                style={[styles.input, {marginTop: 24}]}
              >
                <Input 
                  style={ styles.inputFontSize }
                  placeholder='Phone'
                  keyboardType='numeric'
                  onChangeText={phone => this.setState({phone})}
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
              <TouchableHighlight
                disabled={ !form }
                onPress={() => this.addUser()} 
                style={[modalStyle.touchableHighlight, { borderBottomRightRadius: 10 }]} 
                underlayColor={'#f1f1f1'}
              >
                <Text style={[modalStyle.textModal, { color: !form ? '#ccc' : 'blue' }]}>Add User</Text>
              </TouchableHighlight>
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