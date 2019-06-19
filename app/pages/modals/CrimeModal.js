import React, { Component } from 'react';
import { Icon, Grid, Row, Col, Form, Textarea } from 'native-base';
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
        this.props.changeModalVisibility(false);
    }


    render() {
        return (
            <View style={modalStyle.modalContentContainer} >
                <View style={[modalStyle.modal, { width: this.state.width - 30 }]}>
                    <View style={modalStyle.textView}>
                        <Text style={[modalStyle.textModal, { fontSize: 20, fontWeight: 'bold' }]}>{this.props.setCrimeType} Crime</Text>
                        <Text style={modalStyle.textModal}>*Please provide an image/video of the crime scene.</Text>
                        <Form>
                            <Grid style={{ alignItems: 'center' }}>
                                <Row size={14}>
                                    <Col style={{ alignItems: 'flex-end', margin: 10 }}>
                                        <TouchableOpacity>
                                            <Icon name='camera' />
                                        </TouchableOpacity>
                                    </Col>
                                    <Col>
                                        <TouchableOpacity style={{ margin: 10 }}>
                                            <Icon name='images' />
                                        </TouchableOpacity>
                                    </Col>
                                </Row>
                                <Row size={45}>
                                    <Textarea style={{ width: '95%' }} rowSpan={5} bordered placeholder="Details of the crime (Optional)" />
                                </Row>
                                <Row size={41} >
                                    <Text style={[modalStyle.textModal, { color: 'red' }]}>*False report will cause your account being blocked in the system.</Text>
                                </Row>
                            </Grid>
                        </Form>
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
