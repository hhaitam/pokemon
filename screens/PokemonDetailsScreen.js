import React, {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

function PokemonDetailsScreen({ route }) {
    const { url } = route.params;
    const [pokemonDetails, setPokemonDetails] = useState(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(url);
                setPokemonDetails(response.data);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        fetchPokemonDetails();
    }, [url]);

    if (!pokemonDetails) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
      <View style={styles.container}>
          <Text style={styles.name}>{pokemonDetails.name}</Text>
          <Image
              source={{ uri: pokemonDetails.sprites.front_default }}
              style={styles.image}
          />
          <Text style={styles.info}>Height: {pokemonDetails.height}</Text>
          <Text style={styles.info}>Weight: {pokemonDetails.weight}</Text>
          <Text style={styles.info}>Base Experience: {pokemonDetails.base_experience}</Text>
      </View>
    ); 
}
const styles = StyleSheet.create({
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      marginBottom: 20,
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    info: {
      fontSize: 16,
      marginBottom: 10,
    },
  });


  export default PokemonDetailsScreen;