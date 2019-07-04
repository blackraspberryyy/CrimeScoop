import React, { Component } from 'react';
import { View, Alert, Text, TouchableOpacity, Modal } from 'react-native';
import firebase from 'react-native-firebase';
import MainHeader from '../components/Main/Header';
import { Container, Content, Button, Grid, Col, Row } from 'native-base';
import misc from '../styles/misc';
import CrimeModal from './modals/CrimeModal';
import OtherCrimeModal from './modals/OtherCrimeModal';

// Retrieve Firebase Messaging object.
// const messaging = firebase.messaging();

export default class ReportCrime extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            isModalVisible: false,
            isModalOtherVisible: false,
            chosenType: '',
        };
    }

    componentDidMount() {
        this._isMounted = true;
        firebase.auth().onAuthStateChanged(user => {
            if (user && this._isMounted) {
                this.setState(() => ({ user_id: user.uid }))
            } else {
                this.props.navigation.navigate('Loading')
            }
        })
    }

    changeModalVisibility = (bool) => {
        this.setState({ isModalVisible: bool });
    }

    changeModalOtherVisibility = (bool) => {
        this.setState({ isModalOtherVisible: bool });
    }

    setCrimeType = (data) => {
        this.setState({ chosenType: data })
    }

    render() {
        return (
            <Container>
                <MainHeader
                    navigation={this.props.navigation}
                    title="Report a Crime"
                />
                <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
                    <Grid style={{ alignItems: 'center' }}>
                        <Row style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Col>
                                <Button large dark style={[misc.reportTypeButton, misc.catamaran]} onPress={() => [this.changeModalVisibility(true), this.setCrimeType('Theft')]}>
                                    <Text style={misc.reportType}>Theft</Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button large dark style={[misc.reportTypeButton, misc.catamaran]} onPress={() => [this.changeModalVisibility(true), this.setCrimeType('Murder')]}>
                                    <Text style={misc.reportType}>Murder</Text>
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{ flex: 1, alignItems: 'center' }}>
                            <Col>
                                <Button large dark style={[misc.reportTypeButton, misc.catamaran]} onPress={() => [this.changeModalVisibility(true), this.setCrimeType('Kidnapping')]}>
                                    <Text style={misc.reportType}>Kidnapping</Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button large dark style={[misc.reportTypeButton, misc.catamaran]} onPress={() => [this.changeModalVisibility(true), this.setCrimeType('Brawl')]}>
                                    <Text style={misc.reportType}>Brawl</Text>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Button large dark style={[misc.reportTypeButton, misc.catamaran]} onPress={() => this.changeModalOtherVisibility(true)}>
                                <Text style={misc.reportType}>Others</Text>
                            </Button>
                        </Row>
                    </Grid>
                    <Modal transparent={true} visible={this.state.isModalVisible} onRequestClose={() => this.changeModalVisibility(false)} animationType='fade'>
                        <CrimeModal changeModalVisibility={this.changeModalVisibility} crimeName={this.state.chosenType} />
                    </Modal>
                    <Modal transparent={true} visible={this.state.isModalOtherVisible} onRequestClose={() => this.changeModalOtherVisibility(false)} animationType='fade'>
                        <OtherCrimeModal changeModalOtherVisibility={this.changeModalOtherVisibility} />
                    </Modal>
                </Content>
            </Container >
        );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

}
