import React, { Component } from 'react';
import { PermissionsAndroid, FlatList, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
    CustomView,
    CustomText,
    CustomImage,
    CustomBackgroundImage,
    CustomTouchableOpacity,
    CustomTextInput
} from '../../Custom-Components';
import CONFIG from '../../Constants/global.constants';
import COLORS from '../../Constants/color.constants';
import { SearchImage, MenuImage, BackArrowImage, GroupImage, NewContactImage, DpImage } from '../../Config/image.config';


export default class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            contactName: ''
        }
    }

    componentDidMount() {
        this.readUserData();
    }

    readUserData = () => {

        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG);
            console.log('config', CONFIG)
        }
        console.log('firebase', CONFIG);

        var ref = firebase.database().ref('user/');
        console.log('refff', ref);
        ref.once('value').then((snapshot) => {
            console.log('snapshot', snapshot.val());
            this.setState({ contacts: snapshot.val() })

        }).catch((error) => {
            console.log('error', error);
        })

        ref.on('value', this.giveMeData)

    }

    giveMeData = () => {
        const { contacts } = this.state;
        console.log('contacts', contacts);
        return (
            Object.keys(contacts).map((item) =>

                <CustomView style={{ height: 60, paddingTop: 10, flexDirection: 'row', marginLeft: 20, }}>
                    <CustomTouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.CHAT_ROOM({ contacts: contacts[item].name, item })}>
                        <CustomView style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.FADE, width: 50, height: 50, borderRadius: 25 }}>
                            <CustomImage source={DpImage()} style={{ height: 30, width: 30 }} />
                        </CustomView>
                        <CustomView style={{ marginLeft: 20, marginTop: 10, width: 300, alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                            <CustomText style={{ color: COLORS.BLACK, fontWeight: 'bold', fontSize: 18 }}>{contacts[item].name}</CustomText>
                        </CustomView>
                    </CustomTouchableOpacity>
                </CustomView>
            ))
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: COLORS.WHITE_BACKGROUND }}>
                <CustomView style={{ flex: 1, backgroundColor: COLORS.WHITE_BACKGROUND }}>
                    <CustomView style={{ height: 60, backgroundColor: COLORS.PRIMARY, flexDirection: 'row' }}>

                        <CustomTouchableOpacity onPress={() => Actions.SCROLLABLE_TAB()}>
                            <CustomView style={{ paddingTop: 20, width: 20, alignItems: 'flex-start', justifyContent: 'flex-start', paddingBottom: 50, marginLeft: 10 }}>
                                <CustomImage source={BackArrowImage()} style={{ width: 20, height: 20 }} />
                            </CustomView>
                        </CustomTouchableOpacity>

                        <CustomView style={{ width: 200, marginTop: 15, marginLeft: 10 }}>
                            <CustomText style={{ color: COLORS.WHITE_BACKGROUND, fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginBottom: 15 }}>Selected Contacts</CustomText>
                        </CustomView>


                        <CustomView style={{ flexDirection: 'row', paddingLeft: 60, paddingTop: 10 }}>
                            <CustomTouchableOpacity >
                                <CustomImage source={SearchImage()} style={{ width: 18, height: 18, resizeMode: 'contain', marginTop: 10, marginBottom: 20, marginRight: 15 }} />
                            </CustomTouchableOpacity>
                            <CustomTouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                                <CustomImage source={MenuImage()} style={{ width: 18, height: 18, resizeMode: 'contain', marginTop: 10, marginBottom: 20, marginRight: 40 }} />
                            </CustomTouchableOpacity>
                        </CustomView>

                    </CustomView>

                    <CustomTouchableOpacity>
                        <CustomView style={{ height: 60, paddingTop: 10, flexDirection: 'row', marginLeft: 20, }}>
                            <CustomView style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.BUTTON, width: 50, height: 50, borderRadius: 25 }}>
                                <CustomImage source={GroupImage()} style={{ height: 30, width: 30 }} />
                            </CustomView>
                            <CustomView style={{ marginLeft: 20, width: 300, alignItems: 'flex-start', justifyContent: 'center', }}>
                                <CustomText style={{ color: COLORS.BLACK, fontWeight: 'bold', fontSize: 18 }}>New group</CustomText>
                            </CustomView>
                        </CustomView>
                    </CustomTouchableOpacity>

                    <CustomTouchableOpacity>
                        <CustomView style={{ height: 60, paddingTop: 10, flexDirection: 'row', marginLeft: 20, }}>
                            <CustomView style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.BUTTON, width: 50, height: 50, borderRadius: 25 }}>
                                <CustomImage source={NewContactImage()} style={{ height: 30, width: 30 }} />
                            </CustomView>
                            <CustomView style={{ marginLeft: 20, width: 300, alignItems: 'flex-start', justifyContent: 'center', }}>
                                <CustomText style={{ color: COLORS.BLACK, fontWeight: 'bold', fontSize: 18 }}>New contact</CustomText>
                            </CustomView>
                        </CustomView>
                    </CustomTouchableOpacity>

                    <this.giveMeData />

                </CustomView>
            </ScrollView>
        )
    }
}