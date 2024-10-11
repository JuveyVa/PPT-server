const axios = require('axios');

const typeMap = {
    "fire": 10, 
    "water": 11, 
    "grass": 12  
  };

  async function getRandomPokemonByType(typeId) {
    try {
      const url = "https://pokeapi.co/api/v2/type/" + typeId;
      const response = await axios.get(url);
      const filteredPokemonList = response.data.pokemon;
  
      const pokeIndex = Math.floor(Math.random() * filteredPokemonList.length);
      const pokemonChosen = filteredPokemonList[pokeIndex].pokemon;
      const pokemonNumber = pokemonChosen.url.split("/")[6];
      const spriteImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonNumber + ".png";
      const pokemonName = pokemonChosen.name;
  
      return { name: pokemonName, image: spriteImage };
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener Pokémon aleatorio por tipo');
    }
  }

    module.exports = {
        getRandomPokemonByType,
        typeMap
    };