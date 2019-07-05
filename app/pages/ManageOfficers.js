import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Content, Tab, Tabs, ScrollableTab, Fab, Icon } from 'native-base';
import MainHeader from '../components/Main/Header';
import Users from './manage_officers_tabs/Users'

export default class ManageOfficers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  reloadData = (i, from) => {
    if(i == 0 && from == 0){
      //do Nothing
    }else{
      if(this.reportersTab && typeof this.reportersTab.onRefresh() == 'function'){
        this.reportersTab.onRefresh()
      }
      if(this.brgyTab && typeof this.brgyTab.onRefresh() == 'function'){
        this.brgyTab.onRefresh()
      }
      if(this.policeTab && typeof this.policeTab.onRefresh() == 'function'){
        this.policeTab.onRefresh()
      }
      if(this.superadminsTab && typeof this.superadminsTab.onRefresh() == 'function'){
        this.superadminsTab.onRefresh()
      }
    }
  }

  render() {
    return (
      <Container>
        <MainHeader
          navigation={this.props.navigation}
          title="Manage Officers"
        />
        <Content contentContainerStyle={{ flex: 1 }}>
          <Tabs 
            renderTabBar={() => <ScrollableTab />}
            onChangeTab={({i, from}) => this.reloadData(i, from)}
          >
            <Tab heading="Reporters">
              <Users role='reporter' ref={e => this.reportersTab = e} />
            </Tab>
            <Tab heading="Baranggay Officers">
              <Users role='brgy_officer' ref={e => this.brgyTab = e} />
            </Tab>
            <Tab heading="Police Officers">
              <Users role='police_officer' ref={e => this.policeTab = e} />              
            </Tab>
            <Tab heading="Super Admins">
              <Users role='superadmin' ref={e => this.superadminsTab = e} />              
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}
