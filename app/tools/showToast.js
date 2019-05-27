import { Toast } from 'native-base';

export default function(message, type) {
  Toast.show({
    text: message,
    buttonText: 'Dismiss',
    type: type ? type : undefined,
    duration: 2000,
    textStyle: { fontSize: 12 }
  })
}