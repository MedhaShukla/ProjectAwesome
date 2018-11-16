/**
* Name: Custom Text Input component
* Description: Used to render textinput on the screen
*/
import React from 'react';
import { TextInput } from 'react-native';
import { resizeStyleObj } from '../Utils/dimensionHandler.utils';
import { StyleObjectFilter } from '../Utils/common.utils';

class CustomTextInput extends React.Component {

    constructor(props) {
        super(props);

        const styleDetail = this.updateStyle(props);
        this.state = {
            style: styleDetail
        };
    }

    componentDidMount() {
        // this.props.focusCall = this.nameInput.focus;
        if (this.refs && this.refs.field_name && this.props.getRef) {
            this.props.getRef(this.refs.field_name.focus);
        }
    }

    componentWillReceiveProps(nextProps) {
        const styleDetail = this.updateStyle(nextProps);
        this.setState({
            style: styleDetail
        });
    }

    updateStyle(props) {
        let styleDetail = { ...styles.textInput, ...props.style };
        styleDetail = StyleObjectFilter(styleDetail);

        if (styleDetail) {
            styleDetail = resizeStyleObj(styleDetail);
        }
        return styleDetail;
    }

    render() {
        const { style } = this.state;
        return (
            <TextInput
                ref="field_name"
                {...this.props} style={style}
                underlineColorAndroid={'transparent'}
            />
        );
    }
}

const styles = {
    textInput: {
        height: 40,
    }
};

export { CustomTextInput };
