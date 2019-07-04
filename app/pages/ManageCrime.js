import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import MainHeader from '../components/Main/Header';
import { Container, Content, Tab, Tabs, ScrollableTab } from 'native-base';
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

    reloadData = (i, from) => {
        if(i == 0 && from == 0){
            //do Nothing
        }else{
            if(this.pendingTab && typeof this.pendingTab.onRefresh() == 'function'){
                this.pendingTab.onRefresh()
            }
            if(this.respondingTab && typeof this.respondingTab.onRefresh() == 'function'){
                this.respondingTab.onRefresh()
            }
            if(this.solvedTab && typeof this.solvedTab.onRefresh() == 'function'){
                this.solvedTab.onRefresh()
            }
            if(this.bogusTab && typeof this.bogusTab.onRefresh() == 'function'){
                this.bogusTab.onRefresh()
            }
        }
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
                    <Tabs 
                        renderTabBar={() => <ScrollableTab />}
                        onChangeTab={({i, from}) => this.reloadData(i, from)}
                    >
                        <Tab heading="Pending">
                            <PendingTab ref={e => this.pendingTab = e}/>
                        </Tab>
                        <Tab heading="Responding">
                            <RespondingTab ref={e => this.respondingTab = e} />
                        </Tab>
                        <Tab heading="Solved">
                            <SolvedTab ref={e => this.solvedTab = e}/>
                        </Tab>
                        <Tab heading="Bogus Report">
                            <BogusReportTab ref={e => this.bogusTab = e}/>
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
