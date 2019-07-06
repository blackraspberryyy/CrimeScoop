import React, { Component } from 'react';
import { Icon, Form, Textarea, Content } from 'native-base';
import { View, TouchableHighlight, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import modalStyle from '../../styles/modal';
import changeStatusCriminal from '../../tools/changeStatusCriminal';
import showToast from '../../tools/showToast';
import { tsObjectKeyword } from '@babel/types';

export default class ConfirmDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            criminal: [],
            refreshing: false,
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });

    }

    componentDidMount = () => {
        this.setState({ criminal: this.props.criminal })
    }

    closeModal = () => {
        this.props.changeDeleteVisibility(false);
    }

    changeStatusCriminal() {
        const criminal = this.state.criminal;
        changeStatusCriminal(criminal.id, 0)
            .then(res => showToast(res, 'success'))
            .finally(() => {
                this.props.changeDeleteVisibility(false)
                this.props.onReport()
            })
    }


    render() {
        return (
            <View style={modalStyle.modalContentContainer} >
                <View style={[modalStyle.modal, { width: this.state.width - 70, height: '20%' }]}>
                    <Content style={{ height: '100%' }}>
                        <View style={modalStyle.textView}>
                            <Text style={[modalStyle.textModal, { fontSize: 20, fontWeight: 'bold' }]}>Do you want to delete this criminal?</Text>
                        </View>
                    </Content>
                    <View style={modalStyle.buttonView}>
                        <TouchableHighlight onPress={() => this.closeModal()} style={[modalStyle.touchableHighlight, { borderBottomLeftRadius: 10, borderRightColor: 'grey', borderRightWidth: 1 }]} underlayColor={'#f1f1f1'}>
                            <Text style={[modalStyle.textModal, { color: 'blue' }]}>No</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.changeStatusCriminal()} style={[modalStyle.touchableHighlight, { borderBottomRightRadius: 10 }]} underlayColor={'#f1f1f1'}>
                            <Text style={[modalStyle.textModal, { color: 'blue' }]}>Yes</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View >
        );
    }
}
