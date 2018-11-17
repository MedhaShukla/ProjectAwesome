/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Navigation from './App/Navigation/index.navigation';
import Splash from './App/Scenes/FrontScenes/Splash';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     currentScreen : 'Splash'
    }

    setTimeout(()=>{
      this.setState({ currentScreen: 'Navigation'})
    }, 1000)

  }
  render(){

    const { currentScreen } = this.state;
    let mainScreen = currentScreen === 'Splash' ?  <Splash/> : <Navigation/>
    return mainScreen

  }
  }
