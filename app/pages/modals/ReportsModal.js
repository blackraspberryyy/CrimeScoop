import React, { Component } from 'react';
import { Modal, StyleSheet, Image, ScrollView, TouchableHighlight } from 'react-native';
import { View, Header, Left, Right, Body, Title, Content, Icon, List, ListItem, Text } from 'native-base';
import modalStyle from '../../styles/modal';

export default class ReportsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {},
      visibility: false
    };
  }
  
  componentDidMount(){
    this.setState({report: this.props.report})
    this.setState({visibility: this.props.visibility})
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({report: nextProps.report})
    this.setState({visibility: nextProps.visibility})
  }

  resetValues(){
    this.setState({report: {}})
    this.props.onClose(false)
  }

  render() {
    let { report } = this.state
    let status = [
      <Text style={{color: '#ccc'}}>Pending</Text>,
      <Text style={{color: '#CCCC00'}}>Responding</Text>,
      <Text style={{color: 'green'}}>Solved</Text>,
      <Text style={{color: 'red'}}>Bogus</Text>
    ]

    let image = <Image style={{ height: 200, width: 300 }} source={require('../../assets/placeholder-img.jpg')}/>
    if(report.data){
      if( report.data.upload == ''){
        image = <Image style={{ height: 200, width: 300 }}  source={require('../../assets/placeholder-img.jpg')}/>
      }else{
        image = <Image style={{ height: 200, width: 300 }}  source={{uri: report.data.upload}}/>
      }
    }else{
      image = <Image style={{ height: 200, width: 300 }} source={require('../../assets/placeholder-img.jpg')}/>
    }

    let fname = report.data && report.data.reportedBy && report.data.reportedBy.fname ? report.data.reportedBy.fname : ''
    let lname = report.data && report.data.reportedBy && report.data.reportedBy.lname ? report.data.reportedBy.lname : ''
    let reporter = fname + ' ' + lname
    let stat = report.data && report.data.status ? status[report.data.status - 1] : <Text>Unknown</Text>
    let crime = report.data && report.data.crime && report.data.crime.name ? report.data.crime.name : ''
    let phone = report.data && report.data.reportedBy && report.data.reportedBy.phone ? report.data.reportedBy.phone : ''
    let barangay = report.data && report.data.barangay ? report.data.barangay : ''
    let location = report.data && report.data.location ? report.data.location : ''
    let brgyFname = report.data && report.data.brgyOfficer && report.data.brgyOfficer.fname ? report.data.brgyOfficer.fname : ''
    let brgyLname = report.data && report.data.brgyOfficer && report.data.brgyOfficer.lname ? report.data.brgyOfficer.lname : ''
    let brgyOfficer = brgyFname + ' ' + brgyLname
    let policeFname = report.data && report.data.policeOfficer && report.data.policeOfficer.fname ? report.data.policeOfficer.fname : ''
    let policeLname = report.data && report.data.policeOfficer && report.data.policeOfficer.lname ? report.data.policeOfficer.lname : ''
    let policeOfficer = policeFname == '' && policeLname == '' ? "No Police Officer in charge" : policeFname + ' ' + policeLname
    let summary = report.data && report.data.summary ? report.data.summary : ''
    let respondents = report.data && report.data.respondents ? report.data.respondents : []
    respondents = respondents.join(", ")

    return (
      <Modal
        transparent={true}
        visible={this.state.visibility}
        onRequestClose={() => this.resetValues()}
        animationType='fade'
      >
        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View style={{ backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 10}}>
            <Header>
              <Left>
                <Icon 
                  name='document' 
                  style={{color: '#fff'}}
                />
              </Left>
              <Body>
                <Title>Report</Title>
              </Body>
              <Right/>
            </Header>
            <View style={{alignItems: 'center'}}>
              { image }
            </View>
            <ScrollView style={{height: 400}} >
              <List>
                <ListItem noIndent>
                  <Body>
                    <Text>{reporter}</Text>
                    <Text note>Reporter</Text>
                  </Body>
                  <Right>
                    { stat }
                  </Right>
                </ListItem>
                <ListItem noIndent>
                  <Body>
                    <Text>{phone}</Text>
                    <Text note>Phone</Text>
                  </Body>
                </ListItem>
                <ListItem noIndent>
                  <Body>
                    <Text>{barangay}</Text>
                    <Text note>Barangay</Text>
                  </Body>
                </ListItem>
                <ListItem noIndent>
                  <Body>
                    <Text numberOfLines={2}>{location}</Text>
                    <Text note>Location</Text>
                  </Body>
                </ListItem>
                <ListItem noIndent>
                  <Body>
                    <Text>{crime}</Text>
                    <Text note>Crime Committed</Text>
                  </Body>
                </ListItem>
                <ListItem noIndent>
                  <Body>
                    <Text>{brgyOfficer}</Text>
                    <Text note>Barangay Officer in Charge</Text>
                  </Body>
                </ListItem>
                <ListItem noIndent>
                  <Body>
                    <Text>{policeOfficer}</Text>
                    <Text note>Police Officer in Charge</Text>
                  </Body>
                </ListItem>
              </List>
              {summary != '' && (
                <View style={{paddingVertical: 8, borderBottomColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth}}>
                  <Text style={{paddingHorizontal: 32}}>Summary</Text>
                  <Text style={{paddingLpaddingHorizontaleft: 32, color: '#747474'}}>{summary}</Text>
                </View>
              )}
              {respondents.length > 0 && (
                <View style={{paddingVertical: 8, borderBottomColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth}}>
                  <Text style={{paddingHorizontal: 32}}>Respondents</Text>
                  <Text style={{paddingHorizontal: 32, color: '#747474'}}>{respondents}</Text>
                </View>
              )}
            </ScrollView>
            <View style={modalStyle.buttonView}>
              <TouchableHighlight onPress={() => this.resetValues()} style={[modalStyle.touchableHighlight, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderRightColor: 'grey', borderRightWidth: 1 }]} underlayColor={'#f1f1f1'}>
                <Text style={[modalStyle.textModal, { color: 'blue' }]}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Content>
      </Modal>
    );
  }
}
