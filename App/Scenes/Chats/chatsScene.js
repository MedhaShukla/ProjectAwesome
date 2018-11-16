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
import { SortArrayOfObjects } from '../../Utils/common.utils';

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
            latestText:'',
            lastTimes:{},
            lastMessages: {},
        }
        this.showPeople = this.showPeople.bind(this);

    }

    componentDidMount() {
        this.showPeople();
    }

    showPeople = async () => {

        const { recieverName, message, time, lastText, lastTime} = this.state;

        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG);
        }

        const user = firebase.auth().currentUser;

        firebase.database().ref('/chatroom').child('Entry-' + user._user.uid + '-' + (name || recieverName)).child('/conversation').once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    var val = snapshot.val();
                    Object.values(val).map((item) => {
                        let arr = message;
                        arr.push(item.text)
                        this.setState({ message: arr });
                        let array = time;
                        array.push(time)
                        this.setState({ time: array })
                        this.setState({ lastText: item.text, lastTime: item.timeStamp })
                    })
                }
            })

    const reff = firebase.database().ref('chatroom/');
    reff.once('value').then((snapshot) => {
            var value = snapshot.val()
            Object.keys(value).map((item) => {
                var name = item.split('-')[2];
                var myName =  item.split("-")[1];
                firebase.database().ref('user').once('value')
                    .then((snapshot) => {
                        var userId = snapshot._childKeys;
                        userId.map((item) => {
                            if (name == item) {
                                firebase.database().ref('user/' + item).once('value')
                                    .then((namess) => {
                                        var shubhnaam = new Array();
                                        shubhnaam['name'] = namess._value.name;
                                        shubhnaam['id'] = namess.key; 
                                        firebase.database().ref("newChat").child(myName).child(name).once("value", snap => {
                                                // if(snap && snap._value && snap._value.text){
                                                    let lastMsgs = Object.assign({}, this.state.lastMessages);
                                                    lastMsgs[name] = snap._value.text;
                                                    let lastTime = Object.assign({}, this.state.lastTimes);
                                                    lastTime[name] = snap._value.timeStamp;
                                                    this.setState({
                                                        lastMessages: lastMsgs, 
                                                        lastTimes:lastTime
                                                    })   
                                                // }
                                            })                                      
                                        this.setState({ recieverName: namess.key })
                                        let arr = this.state.chats;
                                        arr.push(shubhnaam);
                                        this.setState({ chats: arr });
                                    })
                                }
                        })
                       
                    })
            }) 


        }).catch((err) => {
            console.log('err', err)
        })
        reff.on('value', this.showMeUser)

    }

    showMeUser = () => {
        const { chats, lastMessages, lastTimes } = this.state;
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {chats.map((item) => 
                    
                    <CustomView style={{ height: 80, paddingTop: 10, flexDirection: 'row', marginLeft: 20, }}>
                        <CustomTouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.CHAT_ROOM({ contacts: item['name'], recieverName: item['id'], })}>
                            <CustomView style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.FADE, width: 50, height: 50, borderRadius: 25 }}>
                                <CustomImage source={DpImage()} style={{ height: 25, width: 25 }} />
                            </CustomView>

                            <CustomView style={{ marginLeft: 20, marginTop: 5, width: 150, alignItems: 'flex-start', justifyContent: 'flex-start', borderBottomWidth: .4, borderColor: COLORS.FADE }}>
                                <CustomText style={{ color: COLORS.BLACK, fontWeight: 'bold', fontSize: 18 }}>{item['name']}</CustomText>
                                    <CustomText>{ 
                                        lastMessages && lastMessages.hasOwnProperty(item.id) ? lastMessages[item.id] : null
                                    }</CustomText>
                            </CustomView>
                            <CustomView style={{ marginTop: 5, width: 170, alignItems: 'flex-start', justifyContent: 'flex-start', borderBottomWidth: .4, borderColor: COLORS.FADE, marginRight: 10 }}>
                                <CustomText>{ lastTimes && lastTimes.hasOwnProperty(item.id)? lastTimes[item.id] : null}</CustomText>
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
