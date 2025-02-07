import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonListScreen from './screens/PokemonListScreen';
import PokemonDetailsScreen from './screens/PokemonDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PokemonList">
        <Stack.Screen name="PokemonList" component={PokemonListScreen} options={{ title: 'Pokémon List' }} />
        <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} options={{ title: 'Pokémon Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}