import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { FlatList, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import {
    CustomView,
    CustomText,
    CustomImage,
    CustomTouchableOpacity,
} from '../../Custom-Components';
import COLORS from '../../Constants/color.constants';
import { ChatImage, DpImage } from '../../Config/image.config';
import { CONFIG } from '../../Constants/global.constants';

export default class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            recieverInfo: [],
            contacts: '',
            recieverName: '',
            chat: '',
            time: [],
            timeStamp: '',
            message: [],
            lastText: '',
            lastTime: '',
            latestText: '',
            lastTimes: {},
            lastMessages: {},
        }
        this.showPeople = this.showPeople.bind(this);

    }

    componentDidMount() {
        this.showPeople();
    }

    showPeople = async () => {

        const { recieverName, message, time, name, lastText, lastTime, } = this.state;

        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG);
        }

        const user = firebase.auth().currentUser;

        //check who exists in database

        firebase.database().ref('/user').child(user._user.uid).child('/chatroom').once('value')
            .then(snaps => {
                var val = snaps._childKeys
                console.log('feerwer', val);
                val.map((name) => {
                    console.log('hb', name)
                    firebase.database().ref('/user').once('value')
                        .then((snapshot) => {
                            var value = snapshot._childKeys;
                            console.log('user', value)
                            value.map((element) => {
                                console.log('elemen', element)
                                if (name == element) {
                                    firebase.database().ref('/user').child(name).once('value').then((snap) => {
                                        var namess = snap._value
                                        console.log('snap', snap, namess.name, snap.key)
                                        var goodname = new Array();
                                        goodname['name'] = namess.name;
                                        goodname['id'] = snap.key;
                                        goodname['imageUri'] = namess.imageUri

                                        firebase.database().ref("newChat").child(user._user.uid).child(name).once("value", snap => {
                                            console.log('sc', snap, snap._value.msgs, snap._value.timeStamp)
                                            let lastMsgs = Object.assign({}, this.state.lastMessages);
                                            lastMsgs[name] = snap._value.msgs;
                                            let lastTime = Object.assign({}, this.state.lastTimes);
                                            lastTime[name] = snap._value.timeStamp;
                                            this.setState({
                                                lastMessages: lastMsgs,
                                                lastTimes: lastTime
                                            })
                                        })
                                        this.setState({ recieverName: snap.key })
                                        let arr = this.state.chats;
                                        arr.push(goodname);
                                        this.setState({ chats: arr });

                                    })
                                }
                            })
                        })
                })
            }).catch((err) => {
                console.log('err', err)
            })
        firebase.database().ref('/user').child(user._user.uid).child('/chatroom').on('value', this.showMeUser)
    }

    showMeUser = () => {
        const { chats, lastMessages, lastTimes, name } = this.state;
        console.log('chas', chats, lastMessages, lastTimes)
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {chats.map((item) =>

                    <CustomView style={{ height: 80, paddingTop: 10, flexDirection: 'row', marginLeft: 20, }}>
                        <CustomTouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.CHAT_ROOM({ contacts: item['name'], recieverName: item['id'], imageUri: item['imageUri'] })}>
                            <CustomView style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.FADE, width: 50, height: 50, borderRadius: 25 }}>
                                <CustomImage source={{ uri: item['imageUri'] }} style={{ height: 50, width: 50, resizeMode: 'cover', borderRadius: 25 }} />
                            </CustomView>

                            <CustomView style={{ marginLeft: 20, marginTop: 5, width: 150, alignItems: 'flex-start', justifyContent: 'flex-start', borderBottomWidth: .4, borderColor: COLORS.FADE }}>
                                <CustomText style={{ color: COLORS.BLACK, fontWeight: 'bold', fontSize: 18 }}>{item['name']}</CustomText>
                                <CustomText>{
                                    lastMessages && lastMessages.hasOwnProperty(item.id) ? lastMessages[item.id] : null
                                }</CustomText>
                            </CustomView>
                            <CustomView style={{ marginTop: 5, width: 170, alignItems: 'flex-start', justifyContent: 'flex-start', borderBottomWidth: .4, borderColor: COLORS.FADE, marginRight: 10 }}>
                                <CustomText>{
                                    lastTimes && lastTimes.hasOwnProperty(item.id) ? lastTimes[item.id] : null
                                }</CustomText>
                            </CustomView>

                        </CustomTouchableOpacity>
                    </CustomView>
                )
                }
            </ScrollView>
        )
    }

    render() {
        return (

            <CustomView style={{ flex: 1, backgroundColor: 'white' }}>

                <this.showMeUser />
                <CustomView style={{ zIndex: 10, marginLeft: 280, marginTop: 400, position: 'absolute', alignItems: 'flex-end', marginRight: 20 }}>
                    <CustomTouchableOpacity onPress={() => Actions.CONTACT_LIST()}>
                        <CustomView style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.BUTTON, alignItems: 'center', justifyContent: 'center' }}>
                            <CustomImage source={ChatImage()} style={{ width: 22, height: 22, resizeMode: 'contain', }} />
                        </CustomView>
                    </CustomTouchableOpacity>
                </CustomView>
            </CustomView>

        )
    }
}    
