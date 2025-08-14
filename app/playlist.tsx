// app/playlist.tsx
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchResultRow from '../components/SearchResultRow';
import { usePlaylists } from '../context/PlaylistContext';

export default function PlaylistDetailScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams();
  const { playlists, removeTrackFromPlaylist } = usePlaylists();

  const currentPlaylist = playlists.find(p => p.id === id);

  const handleRemoveTrack = (trackId: string, trackTitle: string) => {
    if (!currentPlaylist) return;
    Alert.alert(
      "Remove Track",
      `Are you sure you want to remove "${trackTitle}" from this playlist?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => removeTrackFromPlaylist(currentPlaylist.id, trackId),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.header}>{name || 'Playlist'}</Text>

        {currentPlaylist && currentPlaylist.tracks.length > 0 ? (
          <FlatList
            data={currentPlaylist.tracks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.trackRowContainer}>
                <SearchResultRow track={item} playlist={currentPlaylist.tracks} />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemoveTrack(item.id, item.title)}
                >
                  <FontAwesome name="trash-o" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>This playlist is empty.</Text>
            <Text style={styles.emptySubText}>Find songs to add them.</Text>
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
  emptyText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  emptySubText: { color: 'gray', fontSize: 16, marginTop: 8 },
  trackRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    paddingLeft: 15, 
  },
});
