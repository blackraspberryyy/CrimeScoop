import React, { Component } from 'react';
import { Icon, Form, Textarea, Content } from 'native-base';
import { View, TouchableHighlight, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import modalStyle from '../../styles/modal';
import moveReport from '../../tools/reports/moveReport';
import showToast from '../../tools/showToast';
import { tsObjectKeyword } from '@babel/types';

export default class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            report: [],
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });

    }

    componentDidMount = () => {
        this.setState({ report: this.props.report })
    }

    closeModal = () => {
        this.props.changeModalVisibility(false);
    }

    changeStatusCrime() {
        const report = this.state.report;
        if (report.data.status == 1) {
            moveReport(report.id, 2)
                .then(res => showToast(res, 'success'))
                .catch(err => showToast(err, 'error'))
                .finally(() => {
                    this.props.changeModalVisibility(false);
                    this.props.onReport()
                })
        } else if (report.data.status == 2) {
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
            <View style={modalStyle.modalContentContainer} >
                <View style={[modalStyle.modal, { width: this.state.width - 70, height: '20%' }]}>
                    <Content style={{ height: '100%' }}>
                        <View style={modalStyle.textView}>
                            <Text style={[modalStyle.textModal, { fontSize: 20, fontWeight: 'bold' }]}>Do you want to update the status of this crime?</Text>
                        </View>
                    </Content>
                    <View style={modalStyle.buttonView}>
                        <TouchableHighlight onPress={() => this.closeModal()} style={[modalStyle.touchableHighlight, { borderBottomLeftRadius: 10, borderRightColor: 'grey', borderRightWidth: 1 }]} underlayColor={'#f1f1f1'}>
                            <Text style={[modalStyle.textModal, { color: 'blue' }]}>No</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.changeStatusCrime()} style={[modalStyle.touchableHighlight, { borderBottomRightRadius: 10 }]} underlayColor={'#f1f1f1'}>
                            <Text style={[modalStyle.textModal, { color: 'blue' }]}>Yes</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View >
        );
    }
}
