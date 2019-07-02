import React, { Component } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import MainHeader from '../components/Main/Header';
import { Container, Content, Button, Grid, Col, Row, Tab, Tabs, ScrollableTab, Header } from 'native-base';
import misc from '../styles/misc';
import PendingTab from './manage_crime_tabs/Pending';
import RespondingTab from './manage_crime_tabs/Responding';
import BogusReportTab from './manage_crime_tabs/BogusReport';
import SolvedTab from './manage_crime_tabs/Solved';

// Retrieve Firebase Messaging object.
// const messaging = firebase.messaging();

export default class ManageCrime extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            reports: [],
        };
    }

    componentDidMount() {
        this._isMounted = true;
        firebase.auth().onAuthStateChanged(user => {
            if (user && this._isMounted) {
                this.setState(() => ({ user_id: user.uid }))
            } else {
                this.props.navigation.navigate('Loading')
            }
        })

    }

    render() {
        return (
            <Container>
                <MainHeader
                    navigation={this.props.navigation}
                    title="Manage Crime"
                />
                <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
                    {/* <Header hasTabs style={{ backgroundColor: 'white' }} /> */}
                    <Tabs renderTabBar={() => <ScrollableTab />} >
                        <Tab heading="Pending">
                            <PendingTab />
                        </Tab>
                        <Tab heading="Responding">
                            <RespondingTab />
                        </Tab>
                        <Tab heading="Solved">
                            <SolvedTab />
                        </Tab>
                        <Tab heading="Bogus Report">
                            <BogusReportTab />
                        </Tab>
                    </Tabs>
                </Content>
            </Container >
        );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

}
