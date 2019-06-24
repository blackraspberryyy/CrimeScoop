import firebase from 'react-native-firebase'

/* Example Snippet
  let uri = 'file:///storage/emulated/0/Pictures/image-7f2ed32f-fcfc-4a04-89bf-8e72925e2190.jpg'
  let imageName = 'image-7f2ed32f-fcfc-4a04-89bf-8e72925e2190.jpg'
  uploadMedia(uri, imageName)
*/

let downloadUrl = ''

export default async function(uri, name){
  let promise = await new Promise((resolve, reject) => {
    const imageRef = firebase.storage().ref('images').child(name);
    imageRef.putFile(uri)
      .then(() => {
        downloadUrl = imageRef.getDownloadURL();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        downloadUrl = url
        console.log('Done Uploading')
        resolve(downloadUrl);
      })
      .catch(error => {
        console.log('Error uploading image: ', error);
        reject(downloadUrl);
      });
  });
  
  return promise
}