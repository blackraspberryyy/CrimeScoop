import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { Container, Content, Form, Item, Input, Button, Text, View} from 'native-base';
import validator from 'validator';
import MainHeader from '../components/Main/Header';
import misc from '../styles/misc';
import showToast from '../tools/showToast';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fname: '',
      lname: '',
      confPassword: ''
    };
  }

  handleSignUp = () => {
    if (!validator.isEmail(this.state.email)){
      showToast('Email is invalid', 'danger')
      return
    }

    if (this.state.confPassword != this.state.password){
      showToast('Password and Confirm Password does not match', 'danger')
      return
    }
    //TODO: sanitize fname and lname
    
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Dashboard'))
      .catch(error => {
        let mes = getFirebaseSignInErrorMessage(error.code)
        showToast(mes, 'danger')
      })

    // then save to database
  }

  goBack(){
    const { navigate } = this.props.navigation;
    navigate("Loading")
  }

  render() {
    const s = this.state
    let form = s.email &&
      validator.isEmail(s.email) &&
      s.password &&
      s.fname &&
      s.lname && 
      s.confPassword
    
    return (
      <Container>
        <MainHeader
          title="Sign Up"
          onButtonPress={() => this.goBack()}
          backIcon
        />
        <Content>
          <Form style={styles.form}>
            <View style={{ flexDirection: 'row'}}>
              <Item rounded style={[styles.input, styles.colInput, {marginRight: 8}]}>
                <Input
                  style={ styles.inputFontSize }
                  placeholder='Firstname'
                  onChangeText={fname => this.setState({ fname })}
                  value={this.state.fname}
                />
              </Item>
              <Item rounded style={[styles.input, styles.colInput, {marginLeft: 8}]}>
                <Input
                  style={ styles.inputFontSize }
                  placeholder='Lastname'
                  onChangeText={lname => this.setState({ lname })}
                  value={this.state.lname}
                />
              </Item>
            </View>
            <Item rounded style={styles.input}>
              <Input
                style={ styles.inputFontSize }
                autoCapitalize="none"
                placeholder='Email'
                keyboardType='email-address'
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </Item>
            <Item rounded style={styles.input}>
              <Input 
                style={ styles.inputFontSize }
                placeholder='Password' 
                autoCapitalize="none"
                secureTextEntry
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </Item>
            <Item rounded style={styles.input}>
              <Input 
                style={ styles.inputFontSize }
                placeholder='Confirm Password' 
                autoCapitalize="none"
                secureTextEntry
                onChangeText={confPassword => this.setState({ confPassword })}
                value={this.state.confPassword}
              />
            </Item>
            <Button
              onPress={ this.handleSignUp }
              style={styles.button}
              disabled={ !form }
              rounded
              block
            >
              <Text>Sign up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

// styles
const styles = StyleSheet.create({
  form: {
    marginTop:16,
    marginHorizontal: 24
  },
  input: {
    backgroundColor: '#EFEFEF',
    marginTop: 24
  },
  inputFontSize: {
    fontSize: 16
  },
  colInput: {
    flex: 1
  },
  button: { 
    marginTop: 24,
    marginHorizontal: 64
  }
})
