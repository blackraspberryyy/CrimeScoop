import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Thumbnail, Content, Form, Item, Input, Button, Text, View} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import modalStyle from '../../styles/modal'
import userObj from '../../constants/user'

export default class UsersModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      user: {
        data: userObj,
        id: ''
      },
      fname: '',
      lname: '', 
      phone: '',
      avatar: '',
      imageName: ''
    };
  }

  componentDidMount(){
    this.setState({fname: this.props.user.data.fname})
    this.setState({lname: this.props.user.data.lname})
    this.setState({phone: this.props.user.data.phone})
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
        console.log(response)
        let uri = { uri: response.uri };
        this.setState({ avatar: uri });
        this.setState({ imageName: response.fileName });
      }
    });
  }

  resetValues = () => {
    this.setState({fname: ''})
    this.setState({lname: ''})
    this.setState({phone: ''})
    this.setState({avatar: ''})
    this.props.onClose()
  }

  render() {
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

    return (
      <Modal
        transparent={true}
        visible={this.state.visibility}
        onRequestClose={() => this.resetValues()}
        animationType='fade'
      >
        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View style={{ backgroundColor: '#fff', marginHorizontal: 24}}>
            <Form style={[styles.form, {paddingVertical: 32}]}>
              <View style={{alignItems: 'center', marginBottom: 24}}>
                <TouchableOpacity onPress={this.selectPhotoTapped}>
                  { avatar }
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row'}}>
                <Item rounded style={[styles.input, styles.colInput, {marginRight: 8}]}>
                  <Input
                    style={ styles.inputFontSize }
                    placeholder='Firstname'
                    onChangeText={fname => {this.setState({fname})}}
                    defaultValue={this.state.user.data.fname}
                    />
                </Item>
                <Item rounded style={[styles.input, styles.colInput, {marginLeft: 8}]}>
                  <Input
                    style={ styles.inputFontSize }
                    placeholder='Lastname'
                    onChangeText={lname => this.setState({lname})}
                    defaultValue={this.state.user.data.lname}                  
                  />
                </Item>
              </View>
              <Item rounded style={[styles.input, {marginTop: 24}]}>
                <Input 
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
              <TouchableHighlight 
                onPress={() => this.changeReport()} 
                style={[modalStyle.touchableHighlight, { borderBottomRightRadius: 10 }]} 
                underlayColor={'#f1f1f1'}
              >
                <Text style={[modalStyle.textModal, { color: 'blue' }]}>Save Changes</Text>
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