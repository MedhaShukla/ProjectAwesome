/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import ChatRoom from './App/Scenes/Chats/chatRoom';
import Navigation from './App/Navigation/index.navigation';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
