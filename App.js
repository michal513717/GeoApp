import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Components/HomeScreen'
import List from './Components/List'
import Map from './Components/Map'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Zapis pozycji" component={List} options={{
          headerStyle: {
            backgroundColor: 'rgb(36,36,36)',
          },
          headerTintColor: 'white'
        }} />
        <Stack.Screen name="Lokalizacja na mapie" component={Map} options={{
          headerStyle: {
            backgroundColor: 'rgb(36,36,36)',
          },
          headerTintColor: 'white'
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;