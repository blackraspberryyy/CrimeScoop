import React, { Component } from 'react';
import { View, TouchableHighlight, Text, TouchableOpacity, Dimensions } from 'react-native';
import modalStyle from '../../styles/modal';

export default class CrimeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });
    }

    closeModal = () => {
        this.props.changeModalOtherVisibility(false);
    }


    render() {
        return (
            <View style={modalStyle.modalContentContainer}>
                <View style={[modalStyle.modal, { width: this.state.width - 30 }]}>
                    <View style={modalStyle.textView}>
                        <Text style={[modalStyle.textModal, { fontSize: 20, fontWeight: 'bold' }]}>You chose other</Text>
                        <Text style={modalStyle.textModal}>*Please provide an image/video of the crime scene.</Text>
                    </View>
                    <View style={modalStyle.buttonView}>
                        <TouchableHighlight onPress={() => this.closeModal()} style={[modalStyle.touchableHighlight, { borderBottomLeftRadius: 10, borderRightColor: 'grey', borderRightWidth: 1 }]} underlayColor={'#f1f1f1'}>
                            <Text style={[modalStyle.textModal, { color: 'blue' }]}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.closeModal()} style={[modalStyle.touchableHighlight, { borderBottomRightRadius: 10 }]} underlayColor={'#f1f1f1'}>
                            <Text style={[modalStyle.textModal, { color: 'blue' }]}>OK</Text>
                        </TouchableHighlight>
                    </View>
                </View >
            </View >
        );
    }
}
