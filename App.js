import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';


const SwapiComponent = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const charactersArray = [];
        for (let i = 1; i <= 10; i++) {
          const response = await fetch(`https://swapi.dev/api/people/${i}/`);
          const characterData = await response.json();
          charactersArray.push(characterData);
        }
        setCharacters(charactersArray);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <View style={styles.container}>
      {characters.length > 0 ? (
        characters.map((character, index) => (
          <View key={index} style={styles.modal}>
            <View style={styles.campoTexto}><Text style={styles.titulo}>Nome:</Text> <Text style={styles.texto}>{character.name}</Text></View>
            <View style={styles.campoTexto}><Text style={styles.titulo}>Altura:</Text> <Text style={styles.texto}>{character.height}m</Text></View>
            <View style={styles.campoTexto}><Text style={styles.titulo}>Peso:</Text> <Text style={styles.texto}>{character.mass}kg</Text></View>
          </View>
        ))
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
};

export default SwapiComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '30px',
  },
  modal:{
    "width": "300px",
    "height": "130px",
    "paddingHorizontal": "20px",
    "borderRadius": "33px",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "gap": "10px",
    "background-color": "white",
    "boxShadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
  },
  titulo:{
    "fontWeight": "bold"
  },
  campoTexto:{
    "display": "flex",
    "flexDirection": "row",
    "gap": "10px"
  }
});
