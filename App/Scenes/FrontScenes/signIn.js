import React, { Component } from 'react';
import { KeyboardAvoidingView, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
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

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            password: 'screenshot',
            email: 'screenshot@drivezy.com',
            verificationCode: '',
            secureTextEntry: true,
            isLoading: false,
            opacity: 0,
            spinner: false
        }

    }


    verifyUserData() {

        const { email, password, isAuthenticating, authentication } = this.state;

        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG);
        }
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((data) => {
                this.setState({ spinner: true });
                setTimeout(() => {
                    this.nextScene();
                }, 100);
            }).catch((error) => {
                alert('please sign up with your details!')
            })
    }

    nextScene = () => {
        this.setState({ spinner: false })
        Actions.SCROLLABLE_TAB();
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
                    <CustomText style={{ color: COLORS.PRIMARY, fontSize: 20 }}>Sign In here</CustomText>
                </CustomView>

                <CustomView style={{ paddingTop: 20, }}>
                    <CustomView style={{ width: 300, borderBottomWidth: 1, borderBottomColor: COLORS.PRIMARY, marginTop: 10 }}>
                        <CustomTextInput placeholder="email" style={{ height: 40, width: 300 }}
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })} />
                    </CustomView>

                    <CustomView style={{ width: 300, height: 40, borderBottomWidth: 1, borderBottomColor: COLORS.PRIMARY, marginTop: 10 }}>
                        <CustomTextInput placeholder="password" secureTextEntry={this.state.secureTextEntry}
                            value={this.state.password} style={{ height: 40, width: 300 }}
                            onChangeText={(text) => this.setState({ password: text })} />
                    </CustomView>
                    <CustomView style={{ position: 'absolute', zIndex: 10, top: 110, paddingLeft: 280 }}>
                        <CustomTouchableOpacity onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })}>
                            <CustomImage source={this.state.secureTextEntry ? PasswordImage() : OpenEyeImage()} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        </CustomTouchableOpacity>
                    </CustomView>
                </CustomView>
               
                <CustomView style={{ paddingTop: 20, flexDirection: 'row' }}>
                    <CustomText>Not yet signed up! </CustomText>
                    <CustomTouchableOpacity onPress={() => Actions.SIGN_UP()} style={{ borderBottomWidth: 2, borderBottomColor: COLORS.PRIMARY }}>
                        <CustomText style={{ color: COLORS.PRIMARY, fontWeight: 'bold' }}> Sign Up</CustomText>
                    </CustomTouchableOpacity>

                </CustomView>

                <CustomView style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 270 }}>
                    <CustomTouchableOpacity
                        onPress={() => { this.verifyUserData() }}
                        style={{ width: 100, height: 40, backgroundColor: '#8BC34A', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.FADE }}
                    >
                        <CustomText style={{ color: COLORS.WHITE_BACKGROUND, fontSize: 15, alignSelf: 'center' }}>NEXT</CustomText>
                    </CustomTouchableOpacity>
                </CustomView >
            </CustomView>
            
        )
    }
}