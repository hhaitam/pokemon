import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import react, { useEffect, useState} from 'react';
import axios from 'axios';

function PokemonListScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);


  useEffect(() => {
    // fetch data from API
    const fetchPokemonList = async () =>{
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        const results = response.data.results;

        //fetch details of pokemons
        const DetailedPokemonList = await Promise.all(
          results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return{
              name: pokemon.name,
              image: details.data.sprites.front_default,
              url: pokemon.url,
            };
          })
        );
        setPokemonList(DetailedPokemonList);
      }catch (error) {
        console.error('Error fetching list:', error);
      }
    };
    fetchPokemonList();
  }, []);

  //render pokemon item
  const renderItem = ({item}) => (
    <TouchableOpacity 
    style={styles.pokemonCard}
    onPress={() => navigation.navigate('PokemonDetails', { url: item.url})}>
      <Image source={{uri: item.image}} style={styles.pokemonImage} />
      <Text style={styles.pokemonName}>{item.name}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pokémon List</Text>
      <FlatList
      data={pokemonList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    alignItems: 'center',
  },
  pokemonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});


export default PokemonListScreen;
console.log('PokemonListScreen Loaded!');