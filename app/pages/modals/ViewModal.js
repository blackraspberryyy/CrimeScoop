import React, { Component } from 'react';
import { Thumbnail, Content, Grid, Row, Col } from 'native-base';
import { View, TouchableHighlight, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
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
        const report = this.props.report;
        this.setState({ report: report })
        this.setState({ reportedBy: report.reportedBy })
        this.setState({ policeOfficer: report.policeOfficer })
        this.setState({ brgyOfficer: report.brgyOfficer })
        this.setState({ reportedAt: report.reportedAt })
        this.setState({ reportType: report.crime.name })
    }

    closeModal = () => {
        this.props.changeModalVisibility(false);
    }

    render() {
        const report = this.state.report;
        return (
            <View style={modalStyle.modalContentContainer} >
                <View style={[modalStyle.modal, { width: this.state.width - 30 }]}>
                    <Content style={{ height: '100%' }}>
                        <Grid>
                            <Row style={{ justifyContent: "center", paddingBottom: 10 }}>
                                {report.upload == '' ? <Thumbnail square style={{ height: 200, width: 300 }} source={require('../../assets/placeholder-img.jpg')} />
                                    : <Thumbnail square style={{ height: 200, width: 300 }} source={{ uri: report.upload }} />}
                            </Row>
                            <Row>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>Type:</Text>
                                </Col>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>{this.state.reportType}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>Reported By:</Text>
                                </Col>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>{this.state.reportedBy.fname} {this.state.reportedBy.lname}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>Phone Number:</Text>
                                </Col>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>{this.state.reportedBy.phone}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>Location:</Text>
                                </Col>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>{report.location}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>Details:</Text>
                                </Col>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>{report.details}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>Barangay Officer:</Text>
                                </Col>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>{this.state.brgyOfficer.fname} {this.state.brgyOfficer.lname}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>Police Officer:</Text>
                                </Col>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>{this.state.policeOfficer ? this.state.policeOfficer.fname : ''} {this.state.policeOfficer ? this.state.policeOfficer.lname : ''}</Text>
                                </Col>
                            </Row>
                            {
                                (report.status == 2 || report.status == 3) && (
                                    <Row>
                                        <Col style={modalStyle.col}>
                                            <Text style={modalStyle.textModal}>Respondents:</Text>
                                        </Col>
                                        <Col style={modalStyle.col}>
                                            {
                                                report.respondents.map((respondent, key) => {
                                                    return (
                                                        <Text style={modalStyle.textModal} key={key}>{respondent}</Text>
                                                    )
                                                })
                                            }
                                        </Col>
                                    </Row>
                                )
                            }
                            {
                                report.status == 3 && (
                                    <Row>
                                        <Col style={{ paddingLeft: 20 }}>
                                            <Text style={[modalStyle.text, { paddingLeft: 20 }]}>Summary:</Text>
                                            <Text style={[modalStyle.text, { paddingLeft: 30 }]}>{report.summary}</Text>
                                        </Col>
                                    </Row>

                                )
                            }
                        </Grid>

                    </Content>
                    <View style={modalStyle.buttonView}>
                        <TouchableHighlight onPress={() => this.closeModal()} style={[modalStyle.touchableHighlight, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderRightColor: 'grey', borderRightWidth: 1 }]} underlayColor={'#f1f1f1'}>
                            <Text style={[modalStyle.textModal, { color: 'blue' }]}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View >
        );
    }
}
