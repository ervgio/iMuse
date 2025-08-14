// app/(tabs)/library.tsx
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlaylists } from '../../context/PlaylistContext';

export default function LibraryScreen() {
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [createPlaylistModalVisible, setCreatePlaylistModalVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const { playlists, createPlaylist, deletePlaylist } = usePlaylists(); 

  const handleCreatePlaylist = () => {
    if (playlistName.trim() === '') {
      Alert.alert("Error", "Playlist name cannot be empty.");
      return;
    }
    createPlaylist(playlistName);
    setPlaylistName('');
    setCreatePlaylistModalVisible(false);
  };

  
  const handleDeletePress = (playlistId: string, playlistName: string) => {
    Alert.alert(
      "Delete Playlist",
      `Are you sure you want to delete "${playlistName}"?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deletePlaylist(playlistId),
          style: "destructive"
        }
      ]
    );
  };

  const openCreatePlaylistModal = () => {
    setMenuModalVisible(false);
    setCreatePlaylistModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Your Library</Text>

        {playlists.length > 0 ? (
          <FlatList
            data={playlists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.playlistItemContainer}>
                <Link href={{ pathname: "/playlist", params: { id: item.id, name: item.name } }} asChild>
                  <TouchableOpacity style={styles.playlistItem}>
                    <FontAwesome name="music" size={24} color="white" style={styles.playlistIcon} />
                    <Text style={styles.playlistName}>{item.name}</Text>
                  </TouchableOpacity>
                </Link>
            
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeletePress(item.id, item.name)}
                >
                  <FontAwesome name="trash-o" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Your playlists will appear here.</Text>
          </View>
        )}

     
        <TouchableOpacity style={styles.createButton} onPress={() => setMenuModalVisible(true)}>
          <FontAwesome name="plus" size={16} color="black" />
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={menuModalVisible}
          onRequestClose={() => setMenuModalVisible(false)}>
          <Pressable style={styles.modalBackdrop} onPress={() => setMenuModalVisible(false)}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalOption} onPress={openCreatePlaylistModal}>
                <FontAwesome name="list-ul" size={20} color="white" />
                <Text style={styles.modalOptionText}>Playlist</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption}>
                <FontAwesome name="music" size={20} color="white" />
                <Text style={styles.modalOptionText}>Song</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={createPlaylistModalVisible}
          onRequestClose={() => setCreatePlaylistModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.createPlaylistModal}>
              <Text style={styles.createPlaylistTitle}>Name your playlist</Text>
              <TextInput
                style={styles.input}
                placeholder="E.x Cool list"
                placeholderTextColor="gray"
                value={playlistName}
                onChangeText={setPlaylistName}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setCreatePlaylistModalVisible(false)}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmCreateButton} onPress={handleCreatePlaylist}>
                  <Text style={styles.confirmCreateButtonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { flex: 1, paddingHorizontal: 15 },
  header: { color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 30 },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: 'gray', fontSize: 16 },
  createButton: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#1DB954', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 50, flexDirection: 'row', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  createButtonText: { color: 'black', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#282828', width: '90%', borderRadius: 10, padding: 20, position: 'absolute', bottom: 100 },
  modalOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  modalOptionText: { color: 'white', fontSize: 18, marginLeft: 15 },
  createPlaylistModal: { backgroundColor: '#282828', width: '90%', borderRadius: 10, padding: 20 },
  createPlaylistTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#333', color: 'white', borderRadius: 5, padding: 15, fontSize: 16, marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'flex-end' },
  cancelButton: { color: 'white', fontSize: 16, marginRight: 30 },
  confirmCreateButton: { backgroundColor: '#1DB954', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 50 },
  confirmCreateButtonText: { color: 'black', fontWeight: 'bold', fontSize: 16 },

  playlistItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playlistItem: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  playlistIcon: { marginRight: 15 },
  playlistName: { color: 'white', fontSize: 16 },
  deleteButton: {
    padding: 10, 
  },
});
