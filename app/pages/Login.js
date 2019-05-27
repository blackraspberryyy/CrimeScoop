import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text, Toast } from 'native-base';
import validator from 'validator';
import firebase from 'react-native-firebase'
import MainHeader from '../components/Main/Header';
import getFirebaseErrorMessage from '../tools/getFirebaseErrorMessage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }


  showDangerToast = message => {
    Toast.show({
      text: message,
      buttonText: 'Dismiss',
      type: 'danger',
      duration: 2000,
      textStyle: { fontSize: 12 }

    })
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
            let mes = getFirebaseErrorMessage(error.code)
            this.showDangerToast(mes)
          })
      }else {
        this.showDangerToast("Email is invalid")
      }
    }else{
      this.showDangerToast("Please provide needed credentials.")
    }
    
  }

  goBack(){
    const { navigate } = this.props.navigation;
    navigate("Loading")
  }

  render() {
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
    marginHorizontal: 64,
    backgroundColor: '#4169E1'
  }
})