import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    CustomView,
    CustomText,
    CustomImage,
    CustomBackgroundImage,
    CustomTouchableOpacity,
    CustomTextInput
} from '../../Custom-Components';
import COLORS from '../../Constants/color.constants';
import { T$C } from '../../Config/image.config';


export default class TnC extends Component {
    render() {
        return (
            <CustomView style={{ flex: 1 }}>

                <CustomView style={{ paddingTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <CustomText style={{ color: COLORS.PRIMARY, fontSize: 20 }}>Welcome to WhatsApp</CustomText>
                </CustomView>

                <CustomView style={{ paddingTop: 90, alignItems: 'center', justifyContent: 'center' }}>
                    <CustomImage source={T$C()} style={{ width: 250, height: 250, borderRadius: 125, }} />
                </CustomView>

                <CustomView style={{ paddingTop: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <CustomText style={{ alignSelf: 'center' }}>Tap "Agree and Continue" to accept the </CustomText>
                    <CustomText style={{ color: '#29B6F6' }}>WhatsApp Terms </CustomText>
                </CustomView>
                <CustomText style={{ color: '#29B6F6', alignSelf: 'center' }}> of Service and Privacy Policies </CustomText>

                <CustomView style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                    <CustomTouchableOpacity onPress={() => Actions.SIGN_IN()}
                        style={{ width: 350, height: 40, backgroundColor: '#8BC34A', alignItems: 'center', justifyContent: 'center' }}>
                        <CustomText style={{ color: COLORS.WHITE_BACKGROUND, fontSize: 15, alignSelf: 'center' }}>AGREE AND CONTINUE</CustomText>
                    </CustomTouchableOpacity>
                </CustomView >
            </CustomView>
        )
    }
}