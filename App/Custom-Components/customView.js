/**
 * Custom View component; to be used in place of View component. It takes care of absolute values 
 * assigned to it and converts them into relative size according to the screen size of the device
 */

import React from 'react';
import { View } from 'react-native';

import { resizeStyleObj } from '../Utils/dimensionHandler.utils';
import { StyleObjectFilter } from '../Utils/common.utils';

class CustomView extends React.Component {

    constructor(props) {
        super(props);
        const styleDetail = this.updateStyle(props);
        this.state = {
            style: styleDetail
        };
    }

    componentWillReceiveProps(nextProps) {
        const styleDetail = this.updateStyle(nextProps);
        this.setState({
            style: styleDetail
        });
    }

    updateStyle(props) {
        let styleDetail = props.style;
        styleDetail = StyleObjectFilter(styleDetail);

        if (styleDetail) {
            styleDetail = resizeStyleObj(styleDetail);
        }
        return styleDetail;
    }

    render() {
        const { style } = this.state;

        return (
            <View {...this.props} style={style}>
                {this.props.children}
            </View>
        );
    }
}

export { CustomView };
