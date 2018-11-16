/**
* Name: Custom Text component
* Description: Used to render text on the screen
*/
import React from 'react';
import { Text } from 'react-native';
import { resizeStyleObj } from '../Utils/dimensionHandler.utils';
import { StyleObjectFilter } from '../Utils/common.utils';

class CustomText extends React.Component {

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
        // let newStyle = [style, { fontFamily: 'Noway' }]

        // if (style && style.fontWeight != undefined && style.fontWeight != null) {
        //     if (parseInt(style.fontWeight) <= 300) {
        //         newStyle = [style, { fontFamily: 'Noway-Light' }]
        //     } else if (parseInt(style.fontWeight) == 400 || parseInt(style.fontWeight) == 500) {
        //         newStyle = [style, { fontFamily: 'Noway-Light' }]
        //     } else if (parseInt(style.fontWeight) == 600) {
        //         newStyle = [style, { fontFamily: 'Noway' }]
        //     } else {
        //         newStyle = [style, { fontFamily: 'Noway' }]
        //     }
        // }

        return (
            <Text {...this.props} style={style}>
                {this.props.children}
            </Text>
        );
    }
}

export { CustomText }; 
