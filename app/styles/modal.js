import {
    StyleSheet
} from 'react-native';
export default styles = StyleSheet.create({
    modalContentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modal: {
        height: "80%",
        paddingTop: 10,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    textModal: {
        margin: 5,
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
    },
    touchableHighlight: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderTopColor: 'grey',
        borderTopWidth: 1,
    },
    textView: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
    },
    buttonView: {
        width: "100%",
        flexDirection: 'row',
    },
    col: {
        width: "50%",
    }
})