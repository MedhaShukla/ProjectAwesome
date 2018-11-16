import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay'
import {
    CustomView,
    CustomText,
    CustomImage,
    CustomTouchableOpacity,
    CustomTextInput
} from '../../Custom-Components';
import COLORS from '../../Constants/color.constants';
import CONFIG from '../../Constants/global.constants';
import { OpenEyeImage, PasswordImage } from '../../Config/image.config';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            password: '',
            email: '',
            verificationCode: '',
            phoneNumber: '',
            spinner: false,
            secureTextEntry: true,
            authenticating: false
        }
    }


    checkPhoneNumber(text1) {
        this.setState({
            phoneNumber: text1
        })
    }

    createUserData = () => {

        const { phoneNumber, email, password } = this.state;
        if (phoneNumber == '' && email == '' && password == '') {
            alert('Fields can not be empty!')
        }

        if (phoneNumber.length >= 10) {
            console.log("inside if condition");
            var PHONE_REGEXP = /^((0091)|(\+91)|0?)[789]{1}\d{9}$/;
            if (PHONE_REGEXP.test(phoneNumber)) {
                console.log('phoneNumber')
            }
            else {
                alert('Phone Number should be numeric only and of 10 digits!')
            }
        }


        console.log('useruseruseruser', CONFIG);
        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG)
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('data');
                const user = firebase.auth().currentUser;
                firebase.database().ref('user/' + user._user.uid).set({
                    phoneNumber
                }).then((data) => {
                    this.setState({ spinner: true });
                    setTimeout(() => {
                        this.nextScene();
                    }, 100);
                    console.log('data', data);
                }).catch((error) => {
                    console.log('error', error);
                })
            })
            .catch((error) => {
                console.log('error', error)
                alert('Password should be at least 6 characters!')
                alert('Email Adress is badly formatted!')
            });
    }

    nextScene = () => {
        this.setState({ spinner: false })
        Actions.PROFILE()
    }

    render() {
        return (
            <CustomView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.WHITE_BACKGROUND }}>

                <Spinner
                    visible={this.state.spinner}
                    color={COLORS.PRIMARY}
                    textContent={'Loading...'}
                    textStyle={{ color: COLORS.PRIMARY }}
                />


                <CustomView style={{ paddingTop: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <CustomText style={{ color: COLORS.PRIMARY, fontSize: 20 }}>Sign Up with your info</CustomText>
                </CustomView>

                <CustomView style={{ paddingTop: 20, }}>
                    <CustomView style={{ width: 300, borderBottomWidth: 1, borderBottomColor: COLORS.PRIMARY, marginTop: 10 }}>
                        <CustomTextInput placeholder="Email" style={{ height: 40, width: 300 }}
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })} />
                    </CustomView>

                    <CustomView style={{ width: 300, height: 40, borderBottomWidth: 1, borderBottomColor: COLORS.PRIMARY, marginTop: 10 }}>
                        <CustomTextInput placeholder="Password" secureTextEntry={this.state.secureTextEntry}
                            value={this.state.password} style={{ height: 40, width: 300 }}
                            onChangeText={(text) => this.setState({ password: text })} />
                    </CustomView>

                    <CustomView style={{ position: 'absolute', zIndex: 10, top: 110, paddingLeft: 280 }}>
                        <CustomTouchableOpacity onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })}>
                            <CustomImage source={this.state.secureTextEntry ? PasswordImage() : OpenEyeImage()} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        </CustomTouchableOpacity>
                    </CustomView>

                    <CustomView style={{ width: 300, height: 40, borderBottomWidth: 1, borderBottomColor: COLORS.PRIMARY, marginTop: 10 }}>
                        <CustomTextInput placeholder="Phone number" style={{ height: 40, width: 300 }}
                            value={this.state.phoneNumber}
                            keyboardType='numeric'
                            onChangeText={(text) => this.checkPhoneNumber(text)} />
                    </CustomView>
                </CustomView>

                <CustomView style={{ paddingTop: 20, flexDirection: 'row' }}>
                    <CustomText>Already signed up! </CustomText>
                    <CustomTouchableOpacity onPress={() => Actions.SIGN_IN()} style={{ borderBottomWidth: 2, borderBottomColor: COLORS.PRIMARY }}>
                        <CustomText style={{ color: COLORS.PRIMARY, fontWeight: 'bold' }}> Sign In</CustomText>
                    </CustomTouchableOpacity>

                </CustomView>

                <CustomView style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 220 }}>
                    <CustomTouchableOpacity
                        onPress={() => this.createUserData()}
                        style={{ width: 100, height: 40, backgroundColor: '#8BC34A', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.FADE }}
                    >
                        <CustomText style={{ color: COLORS.WHITE_BACKGROUND, fontSize: 15, alignSelf: 'center' }}>NEXT</CustomText>
                    </CustomTouchableOpacity>
                </CustomView >

            </CustomView>
        )
    }
}