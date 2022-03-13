import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native';
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import * as Font from "expo-font";
import MyButton from './MyButton'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styleFont: {
                fontSize: 120,
                fontFamily: 'myfont',
                color: 'white'
            },
            styleFont2: {
                fontFamily: 'myfont',
                fontSize: 35,
                color: 'white'
            }
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('./../assets/fonts/PeakCP.otf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({ fontloaded: true })
        this.setPermissions()
    }

    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
            this.setState({ permission: false })
        } else {
            this.setState({ permission: true })
        }
    }


    render() {
        return (
            (this.state.fontloaded && this.state.permission)
                ?
                <View style={{ flex: 9 }}>
                    <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgb(67,132,78)" }}>
                        <Text style={this.state.styleFont}> GeoMap App </Text>
                        <Text style={this.state.styleFont2}> find and save your position </Text>
                    </View>
                    <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgb(36,36,36)" }}>
                        <MyButton fontSize={40} onPressik={() => this.props.navigation.navigate("Zapis pozycji")} direction={"Start"} />
                    </View>
                </View>
                :
                <View><Text>Odmówione danych o lokazlizacji !</Text></View>
        );
    }
}

export default HomeScreen;
