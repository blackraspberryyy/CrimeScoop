import React, { Component } from 'react';
import { Icon, Form, Textarea, Content, H3 } from 'native-base';
import { capitalize } from 'lodash'
import { View, TouchableHighlight, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import firebase from 'react-native-firebase'
import modalStyle from '../../styles/modal';
import moveReport from '../../tools/reports/moveReport';
import showToast from '../../tools/showToast';
import getDataWithProps from '../../tools/firestore/getDataWithProps';

export default class BogusModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            report: {},
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
        moveReport(report.id, 4)
            .then(res => {
                this.changeUserStatus()
                showToast(res, 'success')
            })
            .catch(err => showToast(err, 'error'))
            .finally(() => {
                this.props.changeModalVisibility(false);
                this.props.onReport()
            })
    }

    changeUserStatus = () => {
        let uid = this.state.report && this.state.report.data && this.state.report.data.reportedBy && this.state.report.data.reportedBy.uid ? this.state.report.data.reportedBy.uid : ''
        if(uid == ''){
            showToast('Reporter\'s Account was not found', 'danger')
        }else{
            getDataWithProps('Users', {uid: uid}).then(res => {
                if(res.length > 0){
                    let status = {status: 0}
                    let ref = firebase.firestore().collection('Users').doc(res[0].id)
                    ref.update(status).then(function() {
                        showToast('User removed successfully.', 'success')
                    })
                    .catch(function(error) {
                        showToast('Something went wrong', 'danger')
                    }).finally(() => {
                        this.props.onReport()
                    })
                }else{
                    showToast('Reporter\'s Account was not found', 'danger')
                    this.props.onReport()
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    render() {
        let fname, lname
        if(this.state.report && this.state.report.data){
            fname = capitalize(this.state.report.data.reportedBy.fname)
            lname = capitalize(this.state.report.data.reportedBy.lname)
        }else{
            fname = ''
            lname = ''
        }

        return (
            <View style={modalStyle.modalContentContainer} >
                <View style={[modalStyle.modal, { width: this.state.width - 70, height: '30%' }]}>
                    <Content style={{ height: '100%' }}>
                        <View style={modalStyle.textView}>
                            <Text style={[modalStyle.textModal, { fontSize: 20, fontWeight: 'bold' }]}>Do you want to move this crime into Bogus Report?</Text>
                            <Text style={{color: 'red', marginHorizontal: 24}}>*Reporter will be blocked because of false crime reporting</Text>
                            <Text style={{fontSize: 16, marginHorizontal: 24, marginTop: 16}}>Reporter: {fname} {lname}</Text>
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
