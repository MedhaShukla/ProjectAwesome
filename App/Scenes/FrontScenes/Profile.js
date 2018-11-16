import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import {
    CustomView,
    CustomText,
    CustomImage,
    CustomBackgroundImage,
    CustomTouchableOpacity,
    CustomTextInput
} from '../../Custom-Components';

import COLORS from '../../Constants/color.constants';

import { } from '../../Config/image.config';


const options = {
    title: 'Select a pic',
    takePhotoButtonTitle: 'Take photo from camera',
    chooseFromLibraryButtonTitle: 'Choose from gallery'

}

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            name: '',
            avatarSource: null,
            uri: ''
        }
        console.log('recieverName', this.props.contacts)
    }

    GetTimeStamp(i = 0) {
        return `${moment().unix()}${i}`;
    }

    getImages = () => {
        const { uri } = this.state;
        const user = firebase.auth().currentUser;
        const uid = user._user.uid;
        ImagePicker.showImagePicker(options, (response) => {
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
                const url = '/profile_picture/' + uid + '/dp' + `${format}`
                const source = { uri: 'data:image/jpeg;base64,' + response.data }
                const metadata = {
                    contentType: 'image/jpg'
                };
                this.setState({ avatarSource: source, uri: response.uri })
                firebase.storage().ref(url).putFile(response.path, metadata)
                    .then(res => {
                        console.log(res, 'res');
                        firebase.database().ref('/user').child(uid).set({
                            imageUri: res.downloadURL
                        }).then((data) => {
                            console.log('data', data)
                        })
                    })
                    .catch(err => {
                    });
            }
        })
    }
    onPress = () => {
        const { name, uri } = this.state;
        if (!name) {
            alert(' please enter your name !')
        }
        else {
            if (!firebase.apps.length) {
                firebase.initializeApp(CONFIG);
                console.log('config', CONFIG)
            }
            const user = firebase.auth().currentUser;
            console.log('user', user)
            firebase.database().ref('user/' + user._user.uid).update({
                name,

            }).then((data) => {
                console.log('data', data);
            }).catch((error) => {
                console.log('error', error);
            })
            Actions.SCROLLABLE_TAB();
        }
    }

    render() {
        return (

            <CustomView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.WHITE_BACKGROUND }}>

                <CustomView style={{ paddingTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <CustomText style={{ color: COLORS.PRIMARY, fontSize: 20 }}>Profile info</CustomText>
                </CustomView>

                <CustomView style={{ paddingTop: 20 }}>
                    <CustomText>Please provide your name and an optional profile </CustomText>
                    <CustomView style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <CustomText>photo</CustomText>
                    </CustomView>
                </CustomView>

                <CustomView style={{ flexDirection: 'row', paddingTop: 20 }}>
                    <CustomTouchableOpacity onPress={() => this.getImages()}>
                        <CustomView style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.FADE, margin: 10, marginBottom: 40, alignItems: 'center', justifyContent: 'center' }}>

                            <CustomImage source={this.state.avatarSource} style={{ width: 60, height: 60, borderRadius: 30, resizeMode: 'cover' }} />

                        </CustomView>
                    </CustomTouchableOpacity>
                    <CustomView style={{ width: 200, height: 60, borderBottomWidth: 2, borderBottomColor: COLORS.PRIMARY, paddingTop: 20 }}>

                        <CustomTextInput style={{ height: 40 }}
                            placeholder={this.props.contacts || 'Type your name here'}
                            value={this.state.name}
                            onChangeText={(text) => this.setState({ name: text })} />
                    </CustomView>
                </CustomView>


                <CustomView style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 250 }}>
                    <CustomTouchableOpacity onPress={() => this.onPress()}
                        style={{ width: 100, height: 40, backgroundColor: '#8BC34A', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.FADE }}>
                        <CustomText style={{ color: COLORS.WHITE_BACKGROUND, fontSize: 15, alignSelf: 'center' }}>NEXT</CustomText>
                    </CustomTouchableOpacity>
                </CustomView >

            </CustomView>
        )
    }
}