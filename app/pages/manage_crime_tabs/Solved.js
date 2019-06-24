import React, { Component } from 'react';
import { Text } from 'react-native';
import { Content } from 'native-base';

// Retrieve Firebase Messaging object.
// const messaging = firebase.messaging();

export default class Solved extends Component {

    render() {
        return (
            <Content contentContainerStyle={{ flex: 1 }}>
                <Text>Solved Tab to</Text>
            </Content>
        );
    }


}
