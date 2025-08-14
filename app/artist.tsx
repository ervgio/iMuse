// app/artist.tsx
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchResultRow from '../components/SearchResultRow';
import { suggestedSongs } from '../data/mockData';

export default function ArtistScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const artistName = name as string;

  
  const tracksByArtist = suggestedSongs.filter(
    song => song.artist.toLowerCase() === artistName.toLowerCase()
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.header}>{artistName || 'Artist'}</Text>

        {tracksByArtist.length > 0 ? (
          <FlatList
            data={tracksByArtist}
            keyExtractor={(item) => item.id}
           
            renderItem={({ item }) => <SearchResultRow track={item} playlist={tracksByArtist} />}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No songs found for this artist.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { flex: 1, paddingHorizontal: 15 },
  backButton: { marginTop: 20, marginBottom: 20 },
  header: { color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: 'gray', fontSize: 16 },
});
