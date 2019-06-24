import React, { Component } from 'react';
import { Text } from 'react-native';
import { Content } from 'native-base';

// Retrieve Firebase Messaging object.
// const messaging = firebase.messaging();

export default class Responded extends Component {

    render() {
        return (
            <Content contentContainerStyle={{ flex: 1 }}>
                <Text>Responded Tab to</Text>
            </Content>
        );
    }


}
