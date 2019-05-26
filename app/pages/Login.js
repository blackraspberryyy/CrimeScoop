import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text, Toast } from 'native-base';
import firebase from 'react-native-firebase'
import MainHeader from '../components/Main/Header';
import misc from '../styles/misc'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleLogin = () => {
    const { username, password } = this.state
    if (username && password){
      firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => this.props.navigation.navigate('Dashboard'))
      .catch(error => {
        console.log(error)
        Toast.show({
          text: error.message,
          buttonText: 'Dismiss',
          type: 'danger',
          textStyle: { fontSize: 12 }
        })
      })
    }else{
      Toast.show({
        text: "Please provide needed credentials.",
        buttonText: 'Dismiss',
        type: 'danger',
        textStyle: { fontSize: 12 }
      })
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
                placeholder='Username'
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
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