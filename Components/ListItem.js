import React, { Component } from 'react';
import { View, Text, Image, Switch, StyleSheet, TouchableOpacity } from 'react-native';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {
        let pic = require('./1.png')
        return (
            <View style={styles.main}>
                <TouchableOpacity onPress={() => this.props.show1()}>
                    <Image
                        source={pic}
                        style={styles.styleImage}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={styles.time}> timestamp: {this.props.timesamp} </Text>
                    <Text style={styles.coords}> latitude: {this.props.latitude}</Text>
                    <Text style={styles.coords}> longitude: {this.props.longitude} </Text>
                </View>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    value={this.props.switchValue}
                    onValueChange={(switchValue) => this.props.switch(switchValue)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    styleImage: {
        borderRadius: 50,
        width: 50,
        height: 50,
    },
    main: {
        padding: 10,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    time: {
        fontWeight: "bold",
        fontSize: 14,
        color: 'white'
    },
    coords: {
        fontSize: 12,
        color: 'white'
    }

});


export default ListItem;
