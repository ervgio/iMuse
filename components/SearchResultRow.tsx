// components/SearchResultRow.tsx
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAudio } from '../context/AudioContext';
import { usePlaylists } from '../context/PlaylistContext';
import { Track, suggestedSongs } from '../data/mockData';

type SearchResultRowProps = {
  track: Track;
  playlist?: Track[]; 
};

const SearchResultRow = ({ track, playlist }: SearchResultRowProps) => {
  const router = useRouter();
  const { playNewSong } = useAudio();
  const { playlists, addTrackToPlaylist } = usePlaylists();
  const [modalVisible, setModalVisible] = useState(false);

  const handlePlayPress = async () => {
    await playNewSong(track, playlist || suggestedSongs);
    router.push('/player');
  };

  const handleAddToPlaylist = (playlistId: string) => {
    addTrackToPlaylist(playlistId, track);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.mainContent} onPress={handlePlayPress}>
          <View style={styles.artworkPlaceholder} />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{track.title}</Text>
            <Text style={styles.artist} numberOfLines={1}>{track.artist}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsButton} onPress={() => setModalVisible(true)}>
          <FontAwesome name="ellipsis-v" size={22} color="gray" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add to playlist...</Text>
            <FlatList
              data={playlists}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalOption} onPress={() => handleAddToPlaylist(item.id)}>
                  <Text style={styles.modalOptionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.modalEmptyText}>No playlists found. Create one in your Library!</Text>}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  mainContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  artworkPlaceholder: { width: 50, height: 50, borderRadius: 4, backgroundColor: '#333', marginRight: 15 },
  textContainer: { flex: 1 },
  title: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  artist: { color: 'gray', fontSize: 14 },
  optionsButton: { padding: 10 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#282828', width: '80%', maxHeight: '50%', borderRadius: 10, padding: 20 },
  modalTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  modalOption: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#404040' },
  modalOptionText: { color: 'white', fontSize: 16 },
  modalEmptyText: { color: 'gray', fontSize: 14, textAlign: 'center' },
});

export default SearchResultRow;
