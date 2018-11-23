import React, { Component } from 'react';
import {
    BackHandler,
    Platform,
    AsyncStorage
} from 'react-native';
import {
    Scene,
    Router,
    Tabs,
    Overlay,
    Modal,
    Drawer,
    Stack,
    Lightbox,
    Actions,
} from 'react-native-router-flux';
import firebase from 'react-native-firebase';
//import custom components here
import {
  CustomView,
  CustomText,
  CustomImage,
  CustomTouchableOpacity,
  CustomTextInput
} from '../Custom-Components';

//import scenes here
import App from '../../App';
import TnC from '../Scenes/FrontScenes/TnC';
import SignIn from '../Scenes/FrontScenes/signIn';
import SignUp from '../Scenes/FrontScenes/signUp';
import Profile from '../Scenes/FrontScenes/Profile';
import ScrollableTab from '../Scenes/FrontScenes/scrollableTab';
import Chats from '../Scenes/Chats/chatsScene';
import ContactList from '../Scenes/FrontScenes/Contacts';
import ChatRoom from '../Scenes/Chats/chatRoom';
import Calls from '../Scenes/Calls/callList';
import CameraScene from '../Scenes/Camera/CameraScene';
import Status from '../Scenes/Status/statusScene';
import Cameras from '../Scenes/Camera/Camera';

//import images here

//import utils here
import {
  getRelativeSizeWidth
} from '../Utils/dimensionHandler.utils';
import CONST from '../Constants/global.constants';
import COLORS from '../Constants/color.constants';

const TabIcon = ({ selected, image, title }) => {
  const selectColor = selected ? COLORS.WHITE_BACKGROUND : COLORS.WHITE_BACKGROUND;
  return (
      <CustomView style={{ alignItems: 'center', justifyContent: 'center', borderBottomColor: selectColor, marginTop: 5 }}>
          <CustomImage
              style={{ height: 20, width: 20 }}
              // Change HERE
              source={image}
          />
          <CustomText style={{ color: COLORS.WHITE_BACKGROUND }}>{title}</CustomText>
      </CustomView>
  )
}


class Navigation extends Component {
  constructor(props) {
      super(props);

  }


  componentDidMount = () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBack);
  }

  componentWillUnmount = () => {
      BackHandler.removeEventListener('hardwareBackPress', this.handleAndroidBack);
  }

  handleAndroidBack = () => {
      Actions.pop();
      return true;
  }
  render() {
    return (
        <CustomView style={{ flex: 1, zIndex: 1 }}>
            <Router
                backAndroidHandler={() => this.handleAndroidBack()}
            >
                <Overlay key="overlay">
                    <Modal key="modal"
                        hideNavBar>
                        <Lightbox key="lightbox">
                            <Stack
                                key="root"
                                hideNavBar
                                titleStyle={{ justifyContent: 'center', alignItems: 'flex-start' }}>

                                <Stack key="Stack">
                                    {/* <Scene key="APP" initial component={App} hideNavBar /> */}
                                    <Scene key="TnC"  component={TnC} hideNavBar /> 
                                    <Scene key="SIGN_IN" initial component={SignIn} hideNavBar />
                                    <Scene key="SIGN_UP" component={SignUp} hideNavBar />
                                    <Scene key="PROFILE" component={Profile} hideNavBar />
                                    <Scene key="SCROLLABLE_TAB"  component={ScrollableTab} hideNavBar />
                                    <Scene key="CHATS" component={Chats} /> 
                                    <Scene key="CHAT_ROOM" component={ChatRoom}  hideNavBar />
                                    <Scene key="CONTACT_LIST" component={ContactList} back backButtonTintColor={COLORS.WHITE_BACKGROUND} hideNavBar />
                                    <Scene Key="STATUS" component={Status} />
                                    <Scene Key="CALLS" component={Calls} />
                                    <Scene key="CAMERA_SCENE" component={CameraScene} hideNavBar />
                                    <Scene key="CAMERA" component={Cameras} hideNavBar/>
                                </Stack>

                            </Stack>
                        </Lightbox>
                    </Modal>
                </Overlay>
            </Router>
        </CustomView>
    );
}
}

const styles = {
NavbarStyle: {
    backgroundColor: COLORS.PRIMARY
},
navBarTitle: {
    color: COLORS.WHITE_BACKGROUND
}
}

export default Navigation;
