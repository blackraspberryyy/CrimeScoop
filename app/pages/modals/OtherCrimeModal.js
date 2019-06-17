import React, { Component } from 'react';
import { View, TouchableHighlight, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';

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
            <TouchableOpacity activeOpacity={1} disabled={true} style={styles.contentContainer}>
                <View style={[styles.modal, { width: this.state.width - 80 }]}>
                    <View style={styles.textView}>
                        <Text style={[styles.text, { fontSize: 20 }]}>You chose other</Text>
                        <Text style={styles.text}>Modal text</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableHighlight onPress={() => this.closeModal()} style={[styles.touchableHighlight, { borderBottomLeftRadius: 10 }]} underlayColor={'#f1f1f1'}>
                            <Text style={[styles.text, { color: 'blue' }]}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.closeModal()} style={[styles.touchableHighlight, { borderBottomRightRadius: 10 }]} underlayColor={'#f1f1f1'}>
                            <Text style={[styles.text, { color: 'blue' }]}>OK</Text>
                        </TouchableHighlight>
                    </View>
                </View >
            </TouchableOpacity >
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        height: 150,
        paddingTop: 10,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'black',
    },
    text: {
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    touchableHighlight: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'black',

    },
    textView: {
        flex: 1,
        alignItems: 'center',
    },
    buttonView: {
        width: "100%",
        flexDirection: 'row',
    }
})