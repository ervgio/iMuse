// app/(tabs)/search.tsx
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchResultRow from '../../components/SearchResultRow';
import { suggestedSongs, Track } from '../../data/mockData';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState<Track[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSongs([]);
    } else {
      const results = suggestedSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(results);
    }
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Search</Text>

        
        <View style={styles.searchBarContainer}>
          <FontAwesome name="search" size={20} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for new hits"
            placeholderTextColor="#535353"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

       
        <FlatList
          data={filteredSongs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SearchResultRow track={item} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Find your favorite songs.</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { flex: 1, paddingHorizontal: 15 },
  header: { color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 20 },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: 'black',
  },
  emptyContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
  },
});
