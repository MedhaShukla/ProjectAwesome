import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

class CustomBackgroundImage extends Component {
    render() {
        return (
            <ImageBackground
                source={this.props.source}
                style={this.props.style}
            >
                {this.props.children}
            </ImageBackground>

        );
    }
}

export { CustomBackgroundImage };
