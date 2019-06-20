import firebase from 'react-native-firebase'

/* data format
  data: {
    title: 'Hello There!',
    body: 'Lorem Ipsum',
  }
*/

export default function (data, token) {
  const message = new firebase.messaging.RemoteMessage()
    .setTo(token)
    .setData(data)
  
    // Send the message
  firebase.messaging()
    .sendMessage(message)
    .then(res => {
      console.log("Success")
      console.log(res)
    })
    .catch(e => {
      console.error(e)
    })
}