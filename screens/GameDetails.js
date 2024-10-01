import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { getGameDetails } from '../metacritic'; // Importa la función de detalles del juego

const GameDetailsScreen = ({ route }) => {
  const { slug } = route.params;
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGameDetails() {
      try {
        const details = await getGameDetails(slug);
        setGameDetails(details);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchGameDetails();
  }, [slug]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles del juego...</Text>
      </View>
    );
  }

  if (!gameDetails) {
    return (
      <View style={styles.container}>
        <Text>No se encontraron detalles para este juego.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: gameDetails.img }} style={styles.image} />
      <Text style={styles.title}>{gameDetails.title}</Text>
      <Text style={styles.description}>{gameDetails.description}</Text>
      <Text style={styles.subtitle}>Score: {gameDetails.score}</Text>

      <FlatList
        data={gameDetails.reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.review}>
            <Text>{item.quote}</Text>
            <Text>Score: {item.score}</Text>
            <Text>Author: {item.author}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Publication: {item.publicationName}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  review: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
});

export default GameDetailsScreen;
