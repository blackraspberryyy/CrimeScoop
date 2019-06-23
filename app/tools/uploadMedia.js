import firebase from 'react-native-firebase'

/* Example Snippet
  let uri = 'file:///storage/emulated/0/Pictures/image-7f2ed32f-fcfc-4a04-89bf-8e72925e2190.jpg'
  let imageName = 'image-7f2ed32f-fcfc-4a04-89bf-8e72925e2190.jpg'
  uploadMedia(uri, imageName)
*/

export default function(uri, name){
  return new Promise((resolve, reject) => {
    const imageRef = firebase.storage().ref('images').child(name);
    return imageRef.putFile(uri)
      .then(() => {
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
        console.log('Done Uploading')
      })
      .catch(error => {
        reject(error);
        console.log('Error uploading image: ', error);
      });
  });
}