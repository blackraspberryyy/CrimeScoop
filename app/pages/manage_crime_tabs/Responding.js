import React, { Component } from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon } from 'native-base';
import { Modal, RefreshControl } from 'react-native'
import firebase from 'react-native-firebase'
import getDataWithProps from '../../tools/firestore/getDataWithProps';
import ViewModal from './../modals/ViewModal';
import ConfirmModal from './../modals/ConfirmModal';
import BogusModal from './../modals/BogusModal';

// Retrieve Firebase Messaging object.
// const messaging = firebase.messaging();

export default class Responding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportsByResponding: [],
            selectedReport: {},
            isViewModalVisible: false,
            isConfirmModalVisible: false,
            isBogusModalVisible: false,
            refreshing: false,
        }
        this.getReportsByResponding = this.getReportsByResponding.bind(this);
    }
    componentDidMount() {
        this.getReportsByResponding();
    }

    changeViewModalVisibility = (bool) => {
        this.setState({ isViewModalVisible: bool });
    }

    changeConfirmModalVisibility = (bool) => {
        this.setState({ isConfirmModalVisible: bool });
    }

    changeBogusModalVisibility = (bool) => {
        this.setState({ isBogusModalVisible: bool });
    }

    getReportsByResponding = () => {
        let uid = ''
        let currentUser = {}
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                uid = user.uid
                getDataWithProps('Users', { uid: uid }).then(res => {
                    currentUser = res[0].data
                    getDataWithProps('Reports', { status: 2 }).then(res => {
                        if(currentUser.role == 'brgy_officer' || currentUser.role == 'police_officer'){
                            let reports = []
                            res.forEach(report => {
                                // check if the barangay of report is in brgys of user
                                if(currentUser.brgys.indexOf(report.data.barangay) > -1){
                                    reports.push(report)
                                }
                            })
                            this.setState({ reportsByResponding: reports })
                        }else{
                            this.setState({ reportsByResponding: res })
                        }
                    })
                })
            }
        });
    }

    getSelectedReport(data) {
        this.setState({ selectedReport: data })
    }

    onRefresh = async () => {
        await this.getReportsByResponding();
        await this.setState({ refreshing: false });
    }

    render() {
        let reports = this.state.reportsByResponding;
        return (
            <Container>
                <Content
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }>
                    <List>
                        {

                            reports.map((report, key) => {
                                // console.log(report.data.brgyOfficer);
                                return (
                                    <ListItem thumbnail key={key} button={true} onPress={() => [this.changeViewModalVisibility(true), this.getSelectedReport(report.data)]}>
                                        <Left>
                                            {report.data.upload == '' ? <Thumbnail square source={require('../../assets/placeholder-img.jpg')} />
                                                : <Thumbnail square source={{ uri: report.data.upload }} />}
                                        </Left>
                                        <Body>
                                            <Text>{report.data.crime.name}</Text>
                                            <Text note numberOfLines={1}>{report.data.location}</Text>
                                            <Text note numberOfLines={2}>{report.data.reportedBy.fname} {report.data.reportedBy.lname}</Text>
                                            <Text note numberOfLines={3}>{new Date(report.data.reportedAt.toDate()).toDateString()}</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent onPress={() => [this.changeConfirmModalVisibility(true), this.getSelectedReport(report)]}>
                                                <Icon name='paper-plane' style={{ color: 'green' }} />
                                            </Button>
                                            <Button transparent onPress={() => [this.changeBogusModalVisibility(true), this.getSelectedReport(report)]}>
                                                <Icon name='trash' style={{ color: 'red' }} />
                                            </Button>
                                        </Right>
                                    </ListItem>

                                );

                            })

                        }
                    </List>
                    <Modal
                        transparent={true}
                        visible={this.state.isViewModalVisible}
                        onRequestClose={() => this.changeViewModalVisibility(false)}
                        animationType='fade'
                    >
                        <ViewModal 
                            changeModalVisibility={this.changeViewModalVisibility} 
                            report={this.state.selectedReport} 
                        />
                    </Modal>
                    <Modal
                        transparent={true}
                        visible={this.state.isConfirmModalVisible}
                        onRequestClose={() => this.changeConfirmModalVisibility(false)}
                        animationType='fade'
                    >
                        <ConfirmModal 
                            changeModalVisibility={this.changeConfirmModalVisibility} 
                            report={this.state.selectedReport}
                            onReport={this.onRefresh}
                        />
                    </Modal>
                    <Modal
                        transparent={true}
                        visible={this.state.isBogusModalVisible}
                        onRequestClose={() => this.changeBogusModalVisibility(false)}
                        animationType='fade'
                    >
                        <BogusModal 
                            changeModalVisibility={this.changeBogusModalVisibility} 
                            report={this.state.selectedReport}
                            onReport={this.onRefresh}
                        />
                    </Modal>
                </Content>
            </Container >
        );

    }


}