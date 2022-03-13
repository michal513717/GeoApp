import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, Dimensions } from 'react-native';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        console.log(this.props.route.params.a)
        let points = this.props.route.params.a.map((item, id) => {
            return (
                <MapView.Marker coordinate={{
                    latitude: item.coords.latitude,
                    longitude: item.coords.longitude,
                }}
                    key={id}
                    title={'ops'}
                    description={"opis"}
                />
            )
        })

        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle}
                    initialRegion={{
                        latitude: this.props.route.params.a[0].coords.latitude,
                        longitude: this.props.route.params.a[0].coords.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                    }}
                >
                    {points}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default Map;
