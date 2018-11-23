// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   Dimensions,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Share
// } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import { CustomView, CustomTouchableOpacity, CustomText, CustomImage } from '../../Custom-Components';

// const shareOptions = {
//     title: 'Title',
//     message: 'Message to share',
//     url: 'data:image/png;base64,<base64_data>',
//     subject: 'Subject'
//   };

//   onSharePress = () => Share.share(shareOptions);

// export default class Camera extends Component {
//   render() {
//     return (
//       <CustomView style={styles.container}>
//         <RNCamera
//             ref={ref => {
//               this.camera = ref;
//             }}
//             style = {styles.preview}
//             type={RNCamera.Constants.Type.back}
//             flashMode={RNCamera.Constants.FlashMode.on}
//             permissionDialogTitle={'Permission to use camera'}
//             permissionDialogMessage={'We need your permission to use your camera phone'}
//         />
       
//         <CustomView style={{flex: 0, top: 5,flexDirection: 'row', justifyContent: 'center'}}>
//         <CustomTouchableOpacity
//             onPress={this.takePicture.bind(this)}
//             style = {styles.capture}
//         >
//         <CustomView style={{ width: 50, height: 50, borderRadius: 25, borderColor: 'white', borderWidth: 2}}></CustomView>
//             {/* <CustomText style={{fontSize: 14}}>  </CustomText> */}
            
//         </CustomTouchableOpacity>
//         </CustomView>
//         <CustomView style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
//         <CustomTouchableOpacity onPress={this.onSharePress} >
//         <CustomView style={{ width: 50, height: 50, borderRadius: 25, borderColor: 'white', borderWidth: 2}}>
//             <CustomImage source={{}}/>
//             </CustomView>
//         </CustomTouchableOpacity>
//         </CustomView>
//       </CustomView>
//     );
//   }

//   takePicture = async function() {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options)
//       console.log(data.uri);
//     }
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black'
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   capture: {
//     flex: 0,
//     // backgroundColor: '#fff',
//     borderRadius: 25,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20
//   }
// });


import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
var ImagePicker = require("react-native-image-picker");
import Camera from 'react-native-camera';
import firebase from 'react-native-firebase';

export default class Cameras extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: null,
      avatarSource:null,
      uri:'',
      recieverName: this.props.contacts
    };
  }

  getImages = () => {
    const user = firebase.auth().currentUser;
    const uid = user._user.uid;
    ImagePicker.showImagePicker(chooseFromLibraryButtonTitle='Choose from gallery', (response) => {
        console.log('Response=', response);
        Object.keys(response).map((item) => {
            console.log('item', item.uri)
        })
        if (response.didCancel) {
            console.log('User canceled ')
        } else if (response.error) {
            console.log('ImagePicker', response.error)
        }
        else {
            const format = '.jpg';
            const url = '/media/' + uid +'/'+ recieverName +'/images'+ `${format}`
            const source = { uri: 'data:image/jpeg;base64,' + response.data }
            const metadata = {
                contentType: 'image/jpg'
            };
            this.setState({ avatarSource: source, uri: response.uri })
            firebase.storage().ref(url).putFile(response.path, metadata)
                .then(res => {
                    
                    console.log(res, 'res');
                    
                //     firebase.database().ref('/user').child(uid).child(name||recieverName).set({
                //         imageUri: res.downloadURL
                //     }).then((data) => {
                //         console.log('data', data)
                //     })
                // })
                // .catch(err => {
                // });
        })
    }
  })
}


  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data);
        this.setState({ path: data.path });
      })
      .catch(err => console.error(err));
  }

  renderCamera() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
      >
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.captures}
          onPress={()=>this.getImages()}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </Camera>
    );
  }

  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >Cancel
        </Text>
        <Text
          style={styles.save}
          onPress={() => this.getImages()}
        >Save
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
    alignItems:'flex-end',
    justifyContent:'center'
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  save:{
    position: 'absolute',
    left: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});
