import React, { Component } from 'react';
import {
    CustomView,
    CustomText,
    CustomImage,
    CustomBackgroundImage,
} from '../../Custom-Components';
import COLORS from '../../Constants/color.constants';
import { WhatsAppLogo, BackgroundWhatsApp } from '../../Config/image.config';

export default class Splash extends Component {
   
    render() {
        return (
            <CustomBackgroundImage source={BackgroundWhatsApp()} style={{ flex: 1, resizeMode: 'cover' }}>
                <CustomView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <CustomImage source={WhatsAppLogo()} style={{ width: 130, height: 130, borderRadius: 10 }} />
                        <CustomText style={{ color: COLORS.WHITE_BACKGROUND, fontSize: 30, fontWeight: 'bold' }}>WhatsApp</CustomText> 
                </CustomView>
            </CustomBackgroundImage>
        )
    }
}