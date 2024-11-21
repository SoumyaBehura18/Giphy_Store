import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchTrendingGIFs, fetchGIFsByKeyword } from '../services/giphyApi';

const HomeScreen = () => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    loadTrendingGIFs();
  }, []);

  const loadTrendingGIFs = async () => {
    setLoading(true);
    const data = await fetchTrendingGIFs();
    setGifs(data);
    setLoading(false);
  };

  const loadMoreGIFs = async () => {
    const data = query
      ? await fetchGIFsByKeyword(query, offset)
      : await fetchTrendingGIFs(offset);
    setGifs((prev) => [...prev, ...data]);
    setOffset((prev) => prev + 20);
  };

  const searchGIFs = async () => {
    setLoading(true);
    const data = await fetchGIFsByKeyword(query);
    setGifs(data);
    setLoading(false);
  };

  const handleSearch = (text) => {
    setQuery(text);
    debounce(searchGIFs, 300)();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search GIFs"
        value={query}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={gifs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Image source={{ uri: item.images.fixed_width.url }} style={styles.gif} />
          )}
          onEndReached={loadMoreGIFs}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchBar: { height: 40, borderWidth: 1, borderRadius: 5, padding: 5 },
  gif: { width: '100%', height: 200, marginVertical: 5 },
});

export default HomeScreen;
