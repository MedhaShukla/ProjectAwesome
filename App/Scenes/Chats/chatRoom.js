import React, { Component } from 'react';
import { FlatList, ScrollView, AsyncStorage, ListItem } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
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
import { VedioCallImage, VoiceCallImage, BackArrowImage, MenuImage, SendImage, ShareIcon, ShareImageIcon } from '../../Config/image.config';
import { GetDateTimeInDayDateTimeFormat } from '../../Utils/common.utils';

export default class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            id1: '',
            id2: '',
            ids: [],
            messages: [],
            recieverids: '',
            chat: {},
            time: [],
            timeStamp: '',
            message: [],
            sender: '',
            recieverName: this.props.recieverName,
            contacts: this.props.contacts,
            name: this.props.item,
            modalVisible: false,
            token: '',
            tokenCopyFeedback: '',
            lastText: '',
            lastTime: '',
            obj: {},
            obj1: {},
            imageUri: this.props.imageUri,
            recieverMsg: [],
            recieverMsgTime: [], currentUser: '',
            msg: '',
            times: '',
            info: [],
            data: []

        }
        console.log('name', name, this.state.contacts, '+', this.state.recieverName)
    }


    componentDidMount() {
        this.showOldChats();
    }

    showOldChats = () => {
        const { name, time, times, data, recieverName, message, info, recieverMsg, recieverMsgTime, recieverids, msgArr, timeArr, idsArr, ids, obj1, obj, chat } = this.state;

        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG);
            console.log('config', CONFIG)
        }
        const user = firebase.auth().currentUser;
        this.setState({ currentUser: user._user.uid });
        // check if user exists or not , if exists show old chats and push a new message

        firebase.database().ref('/chatroom').child(user._user.uid).child('Entry-' + user._user.uid + '-' + (name || recieverName)).child('/conversation').once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    var val = snapshot.val();
                    console.log('oldChats', val)
                    Object.values(val).map((item) => {
                        // console.log('item', item.text, item.timeStamp, item.sender)
                        //     let arr1 = message;
                        //     arr1.push(item.text);
                        //     let arr2 = time;
                        //     arr2.push(item.time)
                        //    let arr3 = ids;
                        //     arr3.push(item.sender);
                        //     console.log('hhvhhe', message)
                        var object = {};
                        object.id = item.sender;
                        object.text = item.text;
                        object.timeStamp = item.timeStamp;
                        var arr = [];
                        // arr.push({
                        //     sender: item.sender,
                        //     msg: item.text,
                        //     timeStamp: item.timeStamp
                        // })
                        arr[item.sender] = { msg: item.text, timeStamp: item.timeStamp }
                        console.log('arr', arr)
                        info.push(arr)
                        this.setState({ info: info })

                        // info.map((item) => {
                        //     console.log('infoItem', item);
                        //     item.map((element) => {
                        //         console.log('element', element);
                        //         console.log('sender', element.sender);
                        //         console.log('name', element.msg);
                        //         console.log('timestamp', element.timeStamp);
                        //         this.setState({ obj:  element})
                        //         console.log('obj', obj)
                        //         this.setState({sender: element.sender,msg: element.msg, times: element.timeStamp })
                        //         })
                        //     })
                        // this.setState({ message:arr1, time:arr2, ids:arr3})


                    })
                }
            })

    }

    showItem = () => {

        const { text, message, sender, recieverName, name, ids, timeStamp, } = this.state;
        let arr = message;
        arr = arr.concat(text);
        this.setState({ message: arr.reverse(), text: '' });

        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG);

        }

        // create a new user
        const user = firebase.auth().currentUser;
        firebase.database().ref('/chatroom').child(user._user.uid).child('Entry-' + user._user.uid + '-' + (name || recieverName)).child('/conversation')
            .push({

                sender: user._user.uid,
                reciever: (name || recieverName),
                text,
                timeStamp: moment().format("DD/MM/YYYY, HH:mm")

            }).then(() => {
                firebase.database().ref("newChat").child(user._user.uid).child(name || recieverName).set({
                    text,
                    timeStamp: moment().format("DD/MM/YYYY, HH:mm")
                })
            }).catch(err => console.log("cannot set data to newChat"));

        firebase.database().ref('/chatroom').child(name || recieverName).child('Entry-' + (name || recieverName) + '-' + user._user.uid).child('/conversation')
            .push({

                sender: user._user.uid,
                reciever: (name || recieverName),
                text,
                timeStamp: moment().format("DD/MM/YYYY, HH:mm")

            }).then(() => {
                firebase.database().ref("newChat").child(name || recieverName).child(user._user.uid).set({
                    text,
                    timeStamp: moment().format("DD/MM/YYYY, HH:mm")
                })
            }).catch(err => console.log("cannot set data to newChat"));
    }

    render() {
        const { contacts, name, lastText, lastTime, data, currentUser, info, obj, obj1, chat, id1, id2, recieverMsg, recieverMsgTime, message } = this.state;
        console.log('currentuser', info);
        return (
            <CustomView style={{ flex: 1 }}>
                <CustomView style={{ height: 70, paddingTop: 20, backgroundColor: COLORS.PRIMARY, flexDirection: 'row' }}>

                    <CustomTouchableOpacity onPress={() => Actions.SCROLLABLE_TAB({ contacts: contacts, name, lastText, lastTime })}>
                        <CustomView style={{ width: 20, alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 10, marginLeft: 10 }}>
                            <CustomImage source={BackArrowImage()} style={{ width: 20, height: 20 }} />
                        </CustomView>
                    </CustomTouchableOpacity>

                    <CustomTouchableOpacity>
                        <CustomView style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.FADE, marginLeft: 10, paddingBottom: 20 }}>
                            <CustomImage source={{ uri: this.state.imageUri }} style={{ width: 40, height: 40, borderRadius: 20, resizeMode: 'cover' }} />
                        </CustomView>
                    </CustomTouchableOpacity>

                    <CustomView style={{ width: 100, alignItems: 'flex-start', justifyContent: 'flex-end', marginTop: 20, marginLeft: 10 }}>
                        <CustomText style={{ color: COLORS.WHITE_BACKGROUND, fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginBottom: 15 }}>  {this.props.contacts}</CustomText>
                    </CustomView>


                    <CustomView style={{ marginTop: 20, alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', paddingLeft: 60 }}>

                        <CustomTouchableOpacity >
                            <CustomImage source={VedioCallImage()} style={{ width: 20, height: 20, resizeMode: 'contain', paddingTop: 15, marginBottom: 20, marginRight: 20 }} />
                        </CustomTouchableOpacity>
                        <CustomTouchableOpacity >
                            <CustomImage source={VoiceCallImage()} style={{ width: 18, height: 18, resizeMode: 'contain', paddingTop: 15, marginBottom: 20, marginRight: 15 }} />
                        </CustomTouchableOpacity>
                        <CustomTouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                            <CustomImage source={MenuImage()} style={{ width: 18, height: 18, resizeMode: 'contain', paddingTop: 15, marginBottom: 20, marginRight: 10 }} />
                        </CustomTouchableOpacity>

                    </CustomView>

                </CustomView>

                <CustomView style={{ flex: 1, margin: 2 }}>
                <ScrollView style={{ flex: 1}} showsVerticalScrollIndicator={false}>
                    <CustomView style={{ flex: 1, margin: 2 }}>
                        {info.map((item, key) => {
                            console.log('item', item, Object.keys(item)[0]);
                            console.log('current medha', currentUser);
                            return (
                                <CustomView style={{ flex: 1}}>
                                    <CustomView style={{ alignItems: Object.keys(item)[0] == currentUser ? 'flex-end' : 'flex-start', justifyContent: 'center', paddingTop: 20 }}>
                                        {Object.values(item).reverse().map((valu) => {
                                            console.log('uytuytu', valu.msg, valu.timeStamp)
                                            return (
                                                <CustomView  >
                                                <CustomText style={{ margin: 5, paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, backgroundColor: Object.keys(item)[0] == currentUser ? COLORS.PRIMARY : COLORS.WHITE_BACKGROUND, borderRadius: 12, borderWidth: 2, borderColor: '#DEDEDE', fontSize: 20, color: Object.keys(item)[0] == currentUser ? COLORS.WHITE_BACKGROUND : COLORS.PRIMARY, borderTopRightRadius: 2 }}>{valu.msg}</CustomText>
                                                    {/* <CustomText style={{ margin: 5,paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, backgroundColor: Object.keys(item)[0] == currentUser ? COLORS.PRIMARY : COLORS.WHITE_BACKGROUND, borderRadius: 12, borderWidth: 2, borderColor: '#DEDEDE', fontSize: 20, color: Object.keys(item)[0] == currentUser ? COLORS.WHITE_BACKGROUND : COLORS.PRIMARY, borderTopRightRadius: 2 }}>{valu.msg}</CustomText> */}
                                                    <CustomText>{valu.timeStamp}</CustomText>
                                                </CustomView>
                                            )
                                        }

                                        )}
                                    </CustomView>
                                </CustomView>
                            )
                        })
                        }
                    </CustomView>
                    </ScrollView>
                </CustomView>
                <CustomView style={{ flex: .12, flexDirection: 'row', alignItems: 'flex-end', marginBottom: 2 }}>

                    <CustomView style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1, borderWidth: 2, borderColor: COLORS.PRIMARY, borderRadius: 20, width: 300, height: 50, marginLeft: 10 }}>
                        <CustomTextInput style={{ width: 300, height: 50 }}
                            placeholder=" Type here..."
                            value={this.state.text}
                            onChangeText={(text) => this.setState({ text: text })} />
                    </CustomView>

                    <CustomView style={{ alignItems: 'center', justifyContent: 'center', flex: .2, width: 50, height: 50 }}>
                        <CustomTouchableOpacity style={{ borderRadius: 25, width: 50, height: 50,backgroundColor: COLORS.PRIMARY, alignItems:'center', justifyContent:'center' }} onPress={() => this.showItem()}>
                            <CustomImage source={SendImage()} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        </CustomTouchableOpacity>
                    </CustomView>
                </CustomView>

                {this.state.modalVisible ?
                    <CustomView style={{ width: 170, height: 60, borderWidth: 2, borderColor: COLORS.FADE, zIndex: 10, top: 1, position: 'absolute', backgroundColor: COLORS.WHITE_BACKGROUND, marginTop: 5, marginRight: 5, borderRadius: 10, marginLeft: 185 }}>
                        <CustomTouchableOpacity onPress={() => Actions.PROFILE({ contacts })} style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                            <CustomText style={{ color: COLORS.BLACK, fontSize: 20 }}>Settings</CustomText>
                        </CustomTouchableOpacity>
                    </CustomView>
                    : null
                }
            </CustomView>
        )
    }
}