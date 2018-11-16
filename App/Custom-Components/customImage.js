/**
* Name: Custom Image component
* Description: Used to render an image on the screen
*/
import React from 'react';
import { Image } from 'react-native';

import { resizeStyleObj } from '../Utils/dimensionHandler.utils';
import { StyleObjectFilter } from '../Utils/common.utils';

class CustomImage extends React.Component {
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
        let styleDetail = { ...styles.img, ...props.style };
        styleDetail = StyleObjectFilter(styleDetail);

        if (styleDetail) {
            styleDetail = resizeStyleObj(styleDetail);
        }
        return styleDetail;
    }

    render() {
        const { style } = this.state;

        return (
            <Image {...this.props} style={style}>
                {this.props.children}
            </Image>
        );
    }
}

const styles = {
    img: {

    }
};

export { CustomImage };
