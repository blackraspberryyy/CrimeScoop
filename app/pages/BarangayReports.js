import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container, Content } from 'native-base'
import MainHeader from '../components/Main/Header';
import ReportList from '../components/Main/ReportList'
import BrgyDropdown from '../components/Main/BrgyDropdown';
import getDataWithProps from '../tools/firestore/getDataWithProps';
import showToast from '../tools/showToast';
import getBarangay from '../tools/getBarangay';
import getCoordinates from '../tools/getCoordinates';

export default class BarangayReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barangay: '',
      reports: [],
      refreshing: false
    };
  }

  componentDidMount(){
    getCoordinates().then(coord => {
      getBarangay(coord).then(res => {
        let brgy = res.properties.NAME_3
        this.setState({barangay: brgy})
        this.onRefresh()
      })
    })
  }

  async setBarangay(brgy){
    await this.setState({barangay: brgy})
    this.onRefresh()
  }

  onRefresh = () => {
    this.setState({refreshing: true})
    //getData of brgy
    let brgy = this.state.barangay
    getDataWithProps('Reports', {barangay: brgy}).then(res => {
      this.setState({reports: res})
      this.setState({refreshing: false})
      showToast('Data Updated', 'success')
    }).catch(err => {
      console.log(err)
      showToast('Could not get data right now.', 'danger')
      this.setState({refreshing: false})
    })
  }

  render() {
    return (
      <Container>
        <MainHeader
          navigation={this.props.navigation}
          title="Brgy. Reports"
        />
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {this.onRefresh()}}
            />
          }
        >
          <BrgyDropdown
            selected={this.state.barangay}
            onPick={brgy => {this.setBarangay(brgy)}}
          />

          <ReportList reports={this.state.reports}/>
        </Content>
      </Container>
    );
  }
}
