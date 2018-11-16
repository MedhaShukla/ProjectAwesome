/**
* Name: Custom Button component
* Description: Used to render a Custom Button on the screen
*/
import React from 'react';
import { TouchableOpacity } from 'react-native';
// import * as Animatable from 'react-native-animatable';
import { CustomText } from '.';
import { resizeStyleObj } from '../Utils/dimensionHandler.utils';
import { StyleObjectFilter } from '../Utils/common.utils';

class CustomButton extends React.Component {
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
        let styleDetail = { ...styles.customButton, ...props.style };
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
                <CustomText>
                    {this.props.children}
                </CustomText>
            </TouchableOpacity>
        );
    }
}

export { CustomButton };

const styles = {
    customButton: {

    }
};
