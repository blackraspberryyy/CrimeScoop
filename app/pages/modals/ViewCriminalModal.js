import React, { Component } from 'react';
import { Thumbnail, Content, Grid, Row, Col } from 'native-base';
import { View, TouchableHighlight, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import modalStyle from '../../styles/modal';

export default class ViewCriminalModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            criminal: [],
            crimes: [],
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });

    }

    componentDidMount = () => {
        const criminal = this.props.criminal;
        this.setState({ criminal: criminal })
        this.setState({ crimes: criminal.crimes })
    }

    closeModal = () => {
        this.props.changeModalVisibility(false);
    }

    render() {
        let criminal = this.state.criminal;
        return (
            <View style={modalStyle.modalContentContainer} >
                <View style={[modalStyle.modal, { width: this.state.width - 30, height: '60%' }]}>
                    <Content style={{ height: '100%' }}>
                        <Grid>
                            <Row style={{ justifyContent: "center", paddingBottom: 10 }}>
                                {criminal.upload == '' ? <Thumbnail square style={{ height: 200, width: 300 }} source={require('../../assets/user-placeholder.jpg')} />
                                    : <Thumbnail square style={{ height: 200, width: 300 }} source={{ uri: criminal.upload }} />}
                            </Row>
                            <Row>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>Fullname:</Text>
                                </Col>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>{criminal.fname} {criminal.lname}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={modalStyle.col}>
                                    <Text style={modalStyle.textModal}>Cases:</Text>
                                </Col>
                                <Col style={modalStyle.col}>
                                    {
                                        this.state.crimes.map((crime, key) => {
                                            return (
                                                <Text style={modalStyle.textModal} key={key}>{crime} </Text>
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
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
