import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableWithoutFeedback, } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Modal from 'react-native-modal';
import COLORS from '../../Constants/color.constants';
import {
    CustomView,
    CustomText,
    CustomImage,
    CustomTouchableOpacity,
    CustomTextInput
} from '../../Custom-Components';
import { SearchImage, MenuImage, CameraImage } from '../../Config/image.config';
import CameraScene from '../Camera/CameraScene';
import Status from '../Status/statusScene';
import Calls from '../Calls/callList';
import Chats from '../Chats/chatsScene';
import { Actions } from 'react-native-router-flux';

export default class ScrollableTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            data: ['New group', 'New broadcast', 'WhatsApp Web', 'Starred messages', 'Setting'],
            name: props.name,
            contacts: props.contacts,
            lastText: props.lastText,
            lastTime: props.lastTime
        }
        console.log(this.props);
    }


    render() {

        const { data } = this.state;
        return (
            <CustomView style={styles.container}>
                <CustomView style={{ flex: .1, backgroundColor: COLORS.PRIMARY, flexDirection: 'row' }}>

                    <CustomView style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: 15, paddingBottom: 20, marginLeft: 10 }}>
                        <CustomText style={{ color: COLORS.WHITE_BACKGROUND, fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}> WhatsApp</CustomText>
                    </CustomView>

                    <CustomView style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row' }}>
                        <CustomTouchableOpacity >
                            <CustomImage source={SearchImage()} style={{ width: 18, height: 18, resizeMode: 'contain', paddingTop: 17, marginBottom: 20, marginRight: 20 }} />
                        </CustomTouchableOpacity>
                        <CustomTouchableOpacity onPress={() => {
                            this.setState({ isVisible: true })
                        }}>
                            <CustomImage source={MenuImage()} style={{ width: 18, height: 18, resizeMode: 'contain', paddingTop: 17, marginBottom: 20, marginRight: 15 }} />
                        </CustomTouchableOpacity>
                    </CustomView>

                </CustomView>

                <ScrollableTabView
                    initialPage={1}
                    tabBarTextStyle={{ fontFamily: 'Roboto', fontSize: 15 }}
                    tabBarActiveTextColor={COLORS.WHITE_BACKGROUND}
                    tabBarInactiveTextColor={COLORS.WHITE_BACKGROUND}
                    tabBarUnderlineStyle={{ backgroundColor: COLORS.WHITE_BACKGROUND, }}
                    renderTabBar={() => <ScrollableTabBar style={{ backgroundColor: COLORS.PRIMARY }} />}
                    ref={(tabView) => { this.tabView = tabView; }}>
                    <CameraScene tabLabel='           ' hideNavBar />
                    <Chats tabLabel='CHATS' contacts={this.state.contacts} lastText={this.state.lastText} lastTime={this.state.lastTime} />
                    <Status tabLabel='STATUS' />
                    <Calls tabLabel='CALLS' />
                </ScrollableTabView>

                <View pointerEvents="none" style={{ position: 'absolute', pointerEvents: 'none', top: 70, left: 30, width: 20, height: 20, resizeMode: 'contain' }}>
                    <CustomImage pointerEvents="none" source={CameraImage()} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                </View>



                {this.state.isVisible ?
                    <TouchableWithoutFeedback onPress={() => Actions.SCROLLABLE_TAB()}>
                        <Modal transparent={false} isVisible={this.state.isVisible} onBackdropPress={() => this.setState({ isVisible: false })}
                        >
                            <CustomView style={{ width: 170, height: 210, borderWidth: 2, borderColor: COLORS.FADE, zIndex: 10, top: 1, position: 'absolute', marginTop: 5, marginRight: 5, borderRadius: 10, marginLeft: 185 }}>
                                {data.map((item) =>
                                    <CustomView style={{ paddingLeft: 10, margin: 10, backgroundColor: COLORS.WHITE_BACKGROUND }}>
                                        <TouchableWithoutFeedback >
                                            <CustomText style={{ color: COLORS.CONTACT_COLOR }}>{item}</CustomText>
                                        </TouchableWithoutFeedback>
                                    </CustomView>
                                )}
                            </CustomView>

                        </Modal>
                    </TouchableWithoutFeedback>
                    : null}

            </CustomView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
