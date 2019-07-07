import React, { Component } from 'react';
import { Icon, Form, Textarea, Content, Item, Header, Input, Container, Body, Left, Right, Title, Label } from 'native-base';
import { View, TouchableHighlight, Text, Dimensions, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import modalStyle from '../../styles/modal';
import moveReport from '../../tools/reports/moveReport';
import showToast from '../../tools/showToast';
import ArrayLister from '../../components/Main/ArrayLister'

export default class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            report: {},
            respondents: [],
            summary: '',
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });

    }

    componentDidMount = () => {
        this.setState({ report: this.props.report })
        // console.log(this.props.report);
    }

    closeModal = () => {
        this.props.changeModalVisibility(false);
    }

    changeStatusCrime() {
        const report = this.state.report;
        let respondents = {
            respondents: this.state.respondents
        }
        if (report.data.status == 1) {
            firebase.firestore().collection('Reports').doc(report.id).update(respondents)
            moveReport(report.id, 2)
                .then(res => showToast(res, 'success'))
                .catch(err => showToast(err, 'error'))
                .finally(() => {
                    this.props.changeModalVisibility(false);
                    this.props.onReport()
                })
        } else if (report.data.status == 2) {
            let summary = {
                summary: this.state.summary
            }
            firebase.firestore().collection('Reports').doc(report.id).update(summary)
            moveReport(report.id, 3)
                .then(res => showToast(res, 'success'))
                .catch(err => showToast(err, 'error'))
                .finally(() => {
                    this.props.changeModalVisibility(false)
                    this.props.onReport()
                })
        }
    }
    render() {
        return (
            <Container style={{ backgroundColor: 'transparent' }}>
                <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <View style={{ backgroundColor: '#fff', marginHorizontal: 24, borderRadius: 10 }}>
                        <Header>
                            <Left>
                                <Icon
                                    name='create'
                                    style={{ color: '#fff' }}
                                />
                            </Left>
                            <Body>
                                {
                                    this.props.report.data.status == 1 ?
                                        <Title>Move to Responding Status</Title> :
                                        <Title>Move to Solved Status</Title>
                                }
                            </Body>
                        </Header>
                        <View style={{ padding: 10 }}>
                            <ArrayLister
                                title="Respondents"
                                items={this.state.respondents}
                                onChangeList={items => this.setState({ respondents: items })}
                            />
                        </View>
                        <View style={modalStyle.buttonView}>
                            <TouchableHighlight onPress={() => this.closeModal()} style={[modalStyle.touchableHighlight, { borderBottomLeftRadius: 10, borderRightColor: 'grey', borderRightWidth: 1 }]} underlayColor={'#f1f1f1'}>
                                <Text style={[modalStyle.textModal, { color: 'blue' }]}>No</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.changeStatusCrime()} style={[modalStyle.touchableHighlight, { borderBottomRightRadius: 10 }]} underlayColor={'#f1f1f1'}>
                                <Text style={[modalStyle.textModal, { color: 'blue' }]}>Yes</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Content >
            </Container>

        );
    }
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: '#EFEFEF'
    },
    inputFontSize: {
        fontSize: 16
    },
    colInput: {
        flex: 1
    }
})