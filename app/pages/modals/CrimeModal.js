import React, { Component } from 'react';
import { Icon, Form, Textarea, Content } from 'native-base';
import { View, TouchableHighlight, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import modalStyle from '../../styles/modal';
import ImagePicker from 'react-native-image-picker';
import addReportCrime from '../../tools/reports/addReportCrime';
import showToast from '../../tools/showToast'

export default class CrimeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            imageSource: null,
            imageName: '',
            details: '',
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });

    }

    closeModal = () => {
        this.props.changeModalVisibility(false);
    }

    submitReport = () => {
        let { imageSource, imageName } = this.state
        let crimeName = this.props.crimeName;
        let crimeType;
        if (crimeName == 'Brawl') {
            crimeType = 1;
        } else {
            crimeType = 2;
        }
        let crime = { type: crimeType, name: crimeName }
        let details = this.state.details;
        addReportCrime(crime, details, imageSource.uri, imageName).then(res => {
            console.log(res)
            this.props.changeModalVisibility(false);
            showToast('Report Added Successfully', 'success')
        })
    }

    selectPhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({ imageSource: source });
                this.setState({ imageName: response.fileName });
            }
        });
    }
    capturePhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({ imageSource: source });
                this.setState({ imageName: response.fileName });
            }
        });
    }
    render() {
        return (
            <View style={modalStyle.modalContentContainer} >
                <View style={[modalStyle.modal, { width: this.state.width - 30 }]}>
                    <Content style={{ height: '100%' }}>
                        <View style={modalStyle.textView}>
                            <Text style={[modalStyle.textModal, { fontSize: 20, fontWeight: 'bold' }]}>{this.props.crimeName} Crime</Text>

                            {this.state.imageSource === null ? (
                                <Text style={[modalStyle.textModal, { height: '30%', backgroundColor: 'grey', padding: 10 }]}>*Please provide an image of the crime scene.</Text>
                            ) : (
                                    <Image source={this.state.imageSource} style={{ width: '80%', height: '40%', backgroundColor: 'grey' }} />
                                )}
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', height: '10%' }}>
                                <TouchableOpacity>
                                    <Icon name='camera' style={{ marginRight: 5 }} onPress={this.capturePhotoTapped} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 5 }} onPress={this.selectPhotoTapped} >
                                    <Icon name='images' />
                                </TouchableOpacity>
                            </View>
                            <Form>
                                <Textarea style={{ width: 320, height: 120 }} rowSpan={3} bordered placeholder="Details of the crime (Optional)" onChangeText={details => this.setState({ details })}
                                    value={this.state.details} />
                            </Form>
                            <Text style={[modalStyle.textModal, { color: 'red', height: 200 }]}>*False report will cause your account being blocked in the system.</Text>

                        </View>
                    </Content>
                    <View style={modalStyle.buttonView}>
                        <TouchableHighlight onPress={() => this.closeModal()} style={[modalStyle.touchableHighlight, { borderBottomLeftRadius: 10, borderRightColor: 'grey', borderRightWidth: 1 }]} underlayColor={'#f1f1f1'}>
                            <Text style={[modalStyle.textModal, { color: 'blue' }]}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.submitReport()} style={[modalStyle.touchableHighlight, { borderBottomRightRadius: 10 }]} underlayColor={'#f1f1f1'}>
                            <Text style={[modalStyle.textModal, { color: 'blue' }]}>OK</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View >
        );
    }
}
