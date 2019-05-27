import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';
import validator from 'validator';
import firebase from 'react-native-firebase';
import MainHeader from '../components/Main/Header';
import getFirebaseSignInErrorMessage from '../tools/getFirebaseSignInErrorMessage';
import showToast from '../tools/showToast';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleLogin = () => {
    const { email, password } = this.state
    if (email && password){
      if (validator.isEmail(email)){
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => this.props.navigation.navigate('Dashboard'))
          .catch(error => {
            let mes = getFirebaseSignInErrorMessage(error.code)
            showToast(mes, 'danger')
          })
      }else {
        showToast('Email is invalid', 'danger')
      }
    }else{
      showToast('Please provide needed credentials.', 'danger')
    }
    
  }

  goBack(){
    const { navigate } = this.props.navigation;
    navigate("Loading")
  }

  render() {
    const s = this.state
    let form = s.email && validator.isEmail(s.email) && s.password

    return (
      <Container>
        <MainHeader 
          title="Login"
          onButtonPress={() => this.goBack()}
          backIcon
        />
        <Content>
          <Form style={styles.form}>
            <Item rounded style={styles.input}>
              <Input
                autoCapitalize="none"
                placeholder='Email'
                keyboardType='email-address'
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </Item>
            <Item rounded style={styles.input}>
              <Input 
                placeholder='Password' 
                autoCapitalize="none"
                secureTextEntry
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </Item>
            <Button
              onPress={ this.handleLogin }
              style={styles.button}
              disabled={ !form }
              rounded
              block
            >
              <Text>Login</Text>
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
  button: { 
    marginTop: 24,
    marginHorizontal: 64
  }
})