import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import misc from '../../../app/styles/misc'

export default class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() { 
    return (
      <Header transparent>
        <Left>
          <Button
            transparent
            onPress={this.props.onButtonPress}
          >
            <Icon 
              name={!this.props.backIcon ? 'menu' : 'arrow-back'}
              style={misc.blackText}
            />
          </Button>
        </Left>
        <Body>
          <Title style={[misc.catamaran, misc.blackText]}>{ this.props.title }</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
