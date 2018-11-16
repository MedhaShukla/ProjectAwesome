import React from 'react';
import { TouchableOpacity } from 'react-native';

import { resizeStyleObj } from '../Utils/dimensionHandler.utils';
import { StyleObjectFilter } from '../Utils/common.utils';
/**
 * Custom Touchable Opacity component; to be used in place of TouchableOpacity component. It takes care of absolute values
 * assigned to it and converts them into relative size according to the screen size of the device
 */
class CustomTouchableOpacity extends React.Component {
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
            <TouchableOpacity {...this.props} style={style}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}

export { CustomTouchableOpacity };
