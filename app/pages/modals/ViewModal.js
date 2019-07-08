import React, { Component } from 'react';
import { View, Header, Left, Right, Body, Title, Content, Icon, List, ListItem, Text, Container } from 'native-base';
import { TouchableHighlight, Dimensions, Image, ScrollView, StyleSheet } from 'react-native';
import modalStyle from '../../styles/modal';

export default class ViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            report: {},
            reportType: '',
            policeOfficer: [],
            brgyOfficer: [],
            reportedBy: [],
            reportedAt: [],
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });

    }

    componentDidMount = () => {
        this.setState({ report: this.props.report })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ report: nextProps.report })
    }

    closeModal = () => {
        this.props.changeModalVisibility(false);
    }

    render() {
        let report = this.state.report;
        let status = [
            <Text style={{ color: '#ccc' }}>Pending</Text>,
            <Text style={{ color: '#CCCC00' }}>Responding</Text>,
            <Text style={{ color: 'green' }}>Solved</Text>,
            <Text style={{ color: 'red' }}>Bogus</Text>
        ]

        let image = <Image style={{ height: 200, width: 300 }} source={require('../../assets/placeholder-img.jpg')} />
        if (report) {
            if (report.upload == '') {
                image = <Image style={{ height: 200, width: 300 }} source={require('../../assets/placeholder-img.jpg')} />
            } else {
                image = <Image style={{ height: 200, width: 300 }} source={{ uri: report.upload }} />
            }
        } else {
            image = <Image style={{ height: 200, width: 300 }} source={require('../../assets/placeholder-img.jpg')} />
        }

        let fname = report && report.reportedBy && report.reportedBy.fname ? report.reportedBy.fname : ''
        let lname = report && report.reportedBy && report.reportedBy.lname ? report.reportedBy.lname : ''
        let reporter = fname + ' ' + lname
        let stat = report && report.status ? status[report.status - 1] : <Text>Unknown</Text>
        let crime = report && report.crime && report.crime.name ? report.crime.name : ''
        let phone = report && report.reportedBy && report.reportedBy.phone ? report.reportedBy.phone : ''
        let barangay = report && report.barangay ? report.barangay : ''
        let location = report && report.location ? report.location : ''
        let brgyFname = report && report.brgyOfficer && report.brgyOfficer.fname ? report.brgyOfficer.fname : ''
        let brgyLname = report && report.brgyOfficer && report.brgyOfficer.lname ? report.brgyOfficer.lname : ''
        let brgyOfficer = brgyFname + ' ' + brgyLname
        let policeFname = report && report.policeOfficer && report.policeOfficer.fname ? report.policeOfficer.fname : ''
        let policeLname = report && report.policeOfficer && report.policeOfficer.lname ? report.policeOfficer.lname : ''
        let policeOfficer = policeFname == '' && policeLname == '' ? "No Police Officer in charge" : policeFname + ' ' + policeLname
        let summary = report && report.summary ? report.summary : ''
        let respondents = report && report.respondents ? report.respondents : []
        respondents = respondents.join(", ")
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <View style={{ backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 10 }} >
                        <Header>
                            <Left>
                                <Icon
                                    name='document'
                                    style={{ color: '#fff' }}
                                />
                            </Left>
                            <Body>
                                <Title>Report</Title>
                            </Body>
                            <Right />
                        </Header>
                        <View style={{ alignItems: 'center' }}>
                            {image}
                        </View>
                        <ScrollView style={{ height: 400 }} >
                            <List>
                                <ListItem noIndent>
                                    <Body>
                                        <Text>{reporter}</Text>
                                        <Text note>Reporter</Text>
                                    </Body>
                                    <Right>
                                        {stat}
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
                                <View style={{ paddingVertical: 8, borderBottomColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth }}>
                                    <Text style={{ paddingHorizontal: 32 }}>Summary</Text>
                                    <Text style={{ paddingHorizontal: 32, color: '#747474' }}>{summary}</Text>
                                </View>
                            )}
                            {respondents.length > 0 && (
                                <View style={{ paddingVertical: 8, borderBottomColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth }}>
                                    <Text style={{ paddingHorizontal: 32 }}>Respondents</Text>
                                    <Text style={{ paddingHorizontal: 32, color: '#747474' }}>{respondents}</Text>
                                </View>
                            )}
                        </ScrollView>
                        <View style={modalStyle.buttonView}>
                            <TouchableHighlight onPress={() => this.closeModal()} style={[modalStyle.touchableHighlight, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderRightColor: 'grey', borderRightWidth: 1 }]} underlayColor={'#f1f1f1'}>
                                <Text style={[modalStyle.textModal, { color: 'blue' }]}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}
