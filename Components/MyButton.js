import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styleButton: {
                justifyContent: 'center',
                alignItems: 'center',
                margin: 15,
            },
            styleFont: {
                fontSize: this.props.fontSize,
                color: 'white',
                textTransform: 'uppercase',
                fontFamily: 'myfont'
            }
        };
    }

    render() {
        return (
            <TouchableOpacity style={this.state.styleButton} onPress={this.props.onPressik}>
                <Text style={this.state.styleFont}> {this.props.direction} </Text>
            </TouchableOpacity>
        );
    }
}

MyButton.propTypes = {
    direction: PropTypes.string.isRequired,
    onPressik: PropTypes.func.isRequired,
};

export default MyButton;
