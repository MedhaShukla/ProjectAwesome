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

        const { recieverName, message, time,name, lastText, lastTime} = this.state;

        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG);
        }

        const user = firebase.auth().currentUser;

      firebase.database().ref('/chatroom').child(user._user.uid).once('value')
        .then((snaps)=>{
            console.log('fir', snaps)
            if(snaps.exists()){
                console.log('ho wha tum ', snaps.exists());
            firebase.database().child(user._user.uid).child('Entry-' + user._user.uid + '-' + (name || recieverName)).child('/conversation').once('value')
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
        }
    })

    const reff = firebase.database().ref('chatroom/').child(user._user.uid);
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
                                        console.log('namess', namess);
                                        var goodname = new Array();
                                        goodname['name'] = namess._value.name;
                                        goodname['id'] = namess.key; 
                                        goodname['imageUri'] = namess._value.imageUri
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
        reff.on('value', this.showMeUser)

    }

    showMeUser = () => {
        const { chats, lastMessages, lastTimes, name } = this.state;
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {chats.map((item) => 
                    
                    <CustomView style={{ height: 80, paddingTop: 10, flexDirection: 'row', marginLeft: 20, }}>
                        <CustomTouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.CHAT_ROOM({ contacts: item['name'], recieverName: item['id'], imageUri:item['imageUri'] })}>
                            <CustomView style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.FADE, width: 50, height: 50, borderRadius: 25 }}>
                                <CustomImage source={{ uri: item['imageUri']}} style={{ height: 50, width: 50, resizeMode:'cover', borderRadius: 25 }} />
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
