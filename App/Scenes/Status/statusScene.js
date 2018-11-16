import React, { Component } from 'react';
import {
    CustomView,
    CustomText,
    CustomImage,
    CustomTouchableOpacity,
    CustomTextInput
} from '../../Custom-Components';
import COLORS from '../../Constants/color.constants';
import { PhotoImage, EditImage, NewContactImage } from '../../Config/image.config';



export default class Status extends Component {
    render() {
        return (
            <CustomView style={{ flex: 1, backgroundColor: COLORS.WHITE_BACKGROUND }}>

                <CustomView style={{ zIndex: 5, top: 70, positon: 'absolute', left: 60 }}>
                    <CustomView style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.BUTTON, width: 15, height: 15, borderRadius: 7 }}>
                        <CustomText style={{ color: COLORS.WHITE_BACKGROUND, fontWeight: 'bold' }}>+</CustomText>
                    </CustomView>
                </CustomView>

                <CustomTouchableOpacity>
                    <CustomView style={{ height: 60, paddingTop: 10, flexDirection: 'row', marginLeft: 20, marginBottom: 10 }}>
                        <CustomView style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.FADE, width: 50, height: 50, borderRadius: 25 }}>
                            <CustomImage source={{}} style={{ height: 30, width: 30 }} />
                        </CustomView>

                        <CustomView style={{ marginLeft: 20, width: 300, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            <CustomText style={{ color: COLORS.BLACK, fontWeight: 'bold', fontSize: 18 }}>My status</CustomText>
                            <CustomText style={{ fontSize: 15 }}>Tap to add status update</CustomText>
                        </CustomView>
                    </CustomView>
                </CustomTouchableOpacity>
                <CustomView style={{ borderBottomWidth: .7, borderBottomColor: COLORS.FADE }}></CustomView>

                <CustomView style={{ zIndex: 10, top: 270, alignItems: 'flex-end', marginRight: 30 }}>
                    <CustomTouchableOpacity>
                        <CustomView style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#E0F2F1', alignItems: 'center', justifyContent: 'center' }}>
                            <CustomImage source={EditImage()} style={{ width: 22, height: 22, resizeMode: 'contain', }} />
                        </CustomView>
                    </CustomTouchableOpacity>
                    <CustomTouchableOpacity>
                        <CustomView style={{ marginTop: 5, width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.BUTTON, alignItems: 'center', justifyContent: 'center' }}>
                            <CustomImage source={PhotoImage()} style={{ width: 22, height: 22, resizeMode: 'contain', }} />
                        </CustomView>
                    </CustomTouchableOpacity>
                </CustomView>
            </CustomView>
        )
    }
}    
