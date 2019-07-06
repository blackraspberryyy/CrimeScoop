import React, { Component } from 'react';
import { Icon, Form, Textarea, Content, Item, Input, Label, Picker } from 'native-base';
import { View, TouchableHighlight, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import modalStyle from '../../styles/modal';
import ImagePicker from 'react-native-image-picker';
import addReportCrime from '../../tools/reports/addReportCrime';
import showToast from '../../tools/showToast'

let crimes = [
    {
        name: 'Choose type of crime',
        type: 0,
    },
    {
        name: 'Vandalism',
        type: 1,
    },
    {
        name: 'Perjury',
        type: 1,
    },
    {
        name: 'Shoplifting',
        type: 1,
    },
    {
        name: 'Making a false report',
        type: 1,
    },
    {
        name: 'Unlawful possession of a weapon',
        type: 1,
    },
    {
        name: 'Possession of a controlled substance',
        type: 1,
    },
    {
        name: 'Prostitution',
        type: 1,
    },
    {
        name: 'Obscenity',
        type: 1,
    },
    {
        name: 'Resisting arrest',
        type: 1,
    },
    {
        name: 'Homicide',
        type: 2,
    },
    {
        name: 'Rape',
        type: 2,
    },
    {
        name: 'Arson',
        type: 2,
    },
    {
        name: 'Human trafficking',
        type: 2,
    },
    {
        name: 'Burglary',
        type: 2,
    },
    {
        name: 'Robbery',
        type: 2,
    },
    {
        name: 'Rape',
        type: 2,
    },
    {
        name: 'Arson',
        type: 2,
    },
    {
        name: 'Criminal damage to property',
        type: 2,
    },
    {
        name: 'Child pornography',
        type: 2,
    },
    {
        name: 'Child abuse',
        type: 2,
    },
    {
        name: 'Money laundering',
        type: 2,
    },
    {
        name: 'Other',
        type: 1,
    },
]

export default class OtherCrimeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            imageSource: null,
            imageName: '',
            details: '',
            otherCrimeName: '',
            selectedCrime: '',
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    closeModal = () => {
        this.props.changeModalOtherVisibility(false);
    }

    onValueChange(value) {
        this.setState({ selectedCrime: value })
    }

    submitReport = () => {
        let { imageSource, imageName } = this.state
        let crimeName;
        let crimeType;
        if (this.state.selectedCrime == '') {
            showToast('Please choose type of crime', 'error')
        } else {
            if (this.state.selectedCrime == 'Other') {
                crimeName = this.capitalize(this.state.otherCrimeName);
                crimeType = 1;
            } else {
                let crimeResult;
                crimeName = this.state.selectedCrime;
                crimeResult = crimes.filter(obj => {
                    return obj.name === this.state.selectedCrime
                })
                crimeType = crimeResult[0].type;
            }
            let crime = { type: crimeType, name: crimeName }
            let details = this.state.details;
            addReportCrime(crime, details, imageSource.uri, imageName).then(res => {
                console.log(res)
                this.props.changeModalVisibility(false);
                showToast('Report Added Successfully', 'success')
            })
        }
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
            <View style={modalStyle.modalContentContainer}>
                <View style={[modalStyle.modal, { width: this.state.width - 30 }]}>
                    <Content style={{ height: '100%' }}>
                        <View style={modalStyle.textView}>
                            <Text style={[modalStyle.textModal, { fontSize: 20, fontWeight: 'bold' }]}>You chose Others</Text>

                            {this.state.imageSource === null ? (
                                <Text style={[modalStyle.textModal, { height: '30%', backgroundColor: 'grey', padding: 10 }]}>*Please provide an image of the crime scene.</Text>
                            ) : (
                                    <Image source={this.state.imageSource} style={{ width: '80%', height: '30%', backgroundColor: 'grey' }} />
                                )}
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', height: '10%' }}>
                                <TouchableOpacity>
                                    <Icon name='camera' style={{ marginRight: 5 }} onPress={this.capturePhotoTapped} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 5 }} onPress={this.selectPhotoTapped} >
                                    <Icon name='images' />
                                </TouchableOpacity>
                            </View>
                            <Form style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Item picker style={{ width: 350 }}>
                                    <Picker
                                        mode="dropdown"
                                        style={{ width: 280 }}
                                        placeholder={'Select type of the crime'}
                                        selectedValue={this.state.selectedCrime}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        {
                                            crimes.map((crime, key) => {
                                                return (
                                                    <Picker.Item label={crime.name} value={crime.name} key={key} />
                                                )
                                            })
                                        }
                                    </Picker>
                                </Item>
                                {
                                    this.state.selectedCrime == 'Other' &&
                                    <Item floatingLabel style={{ marginBottom: 10, width: 305 }}  >
                                        <Label>Please specify the type of crime</Label>
                                        <Input
                                            onChangeText={otherCrimeName => this.setState({ otherCrimeName })}
                                            value={this.state.otherCrimeName}
                                        />
                                    </Item>
                                }

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
                </View >
            </View >
        );
    }
}
