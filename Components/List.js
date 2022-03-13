import React, { Component } from 'react';
import { View, StyleSheet, Alert, Switch } from 'react-native';
import { AsyncStorage } from "react-native"
import * as Location from "expo-location";
import { ActivityIndicator } from 'react-native';

import MyButton from './MyButton'
import ListItem from './ListItem'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPositions: [],
            id: 0,
            mainSwitch: false,
        };
    }

    componentDidMount = () => {
        this.setState({ loading: true })
    }

    switch = (e, index) => {
        let newSwitch = this.state.allPositions
        newSwitch[index].switchValue = e;
        this.setState({
            allPositions: newSwitch
        })
    }

    deleteAllPositions = () => {
        this.setState({
            allPositions: [],
            id: 0
        })
        alert('Usunięto wszystkie dane')
    }

    show1 = (e) => {  // Tworzymy metode ktora bedzie przekierowywala obiekt o elemencie kliknietym
        let b = []    // id i przechodzila do mapy
        this.state.allPositions.map((item) => {
            if (item.id == e) {
                b[0] = item
            }
        })
        this.props.navigation.navigate('Lokalizacja na mapie', { a: b })
    }


    getPosition = async () => {
        return new Promise((resolve) => {
            console.log("getting the position")
            let pos = Location.getCurrentPositionAsync({})
            resolve(pos)
        })
    }

    saveCurrentLocation = async () => {
        this.setState({ loading: false })
        console.log("waiting ...")
        let currentPosition = await this.getPosition()
        this.setState({ loading: true })
        Alert.alert(
            'Aktualizacja bazy',
            'Czy chcesz zapisać pobraną pozycję ?',
            [
                {
                    text: 'Tak',
                    onPress: () => this.savePosition(currentPosition)
                },
                {
                    text: 'Nie',
                    onPress: () => console.log('Dont save !')
                },
            ],
            { cancelable: false },
        );
        console.log("done")
    }

    savePosition(currentPosition) {
        currentPosition.id = this.state.id;
        let newTablePositions = this.state.allPositions;
        newTablePositions.push(currentPosition);
        this.setState({
            loading: true,
            allPositions: newTablePositions,
            id: this.state.id + 1,
            switchValue: false
        });
    }

    mainSwitch(value) {
        console.log(value)
        let newSwitch = this.state.allPositions
        for (let i = 0; i < newSwitch.length; i++) {
            newSwitch[i].switchValue = value
        }
        this.setState({
            allPositions: newSwitch,
            mainSwitch: value
        })
    }


    render() {
        let points = this.state.allPositions.map((item, i) => {
            return <ListItem value={item} key={i} timesamp={item.timestamp} latitude={item.coords.latitude} show1={() => this.show1(i)} longitude={item.coords.longitude} switchValue={item.switchValue} id={item.id} switch={(e) => this.switch(e, i)} />
        })

        let positionsToShow = [];
        for (let i = 0; i < this.state.allPositions.length; i++) {
            if (this.state.allPositions[i].switchValue) {
                positionsToShow.push(this.state.allPositions[i])
            }
        }

        return (
            (this.state.loading) ?
                <View style={styles.container}>
                    <View style={styles.twoButtons}>
                        <MyButton fontSize={30} direction={"Pobierz i zapisz pozycje"} onPressik={() => this.saveCurrentLocation()} />
                        <MyButton fontSize={30} direction={"Usun wszystkie dane"} onPressik={() => this.deleteAllPositions()} />
                    </View>
                    <View style={styles.singleButton}>
                        <MyButton fontSize={40} direction={"Przejdz do mapy"} onPressik={() => (positionsToShow.length >= 1) ? this.props.navigation.navigate('Lokalizacja na mapie', { a: positionsToShow }) : alert("wybierz przyjamniej jedną pozycję !")} />
                        <Switch style={styles.switch}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            value={this.state.mainSwitch}
                            onValueChange={(switchValue) => this.mainSwitch(switchValue)}
                        />
                    </View>
                    <View style={styles.points}>
                        {points}
                    </View>
                </View>
                :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgb(36,36,36)' }}><ActivityIndicator size="large" color="#0000ff" /></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        color: 'white',
        flex: 1,
    },

    twoButtons: {
        flex: 1,
        backgroundColor: 'rgb(67,132,78)',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },

    singleButton: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgb(67,132,78)',
        flexDirection: 'row'
    },

    switch: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    points: {
        flex: 5,
        backgroundColor: 'rgb(36,36,36)'
    }

});

export default List;
