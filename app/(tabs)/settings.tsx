// app/(tabs)/settings.tsx
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlaylists } from '../../context/PlaylistContext';

export default function SettingsScreen() {
  const { clearAllPlaylists } = usePlaylists();

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to delete all your playlists? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Clear Data",
          onPress: () => {
            clearAllPlaylists();
            Alert.alert("Success", "All your data has been cleared.");
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Settings</Text>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.row}>
            <FontAwesome name="info-circle" size={24} color="gray" />
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>App Version</Text>
              <Text style={styles.rowSubtitle}>1.0.0</Text>
            </View>
          </View>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <TouchableOpacity style={styles.row} onPress={handleClearData}>
            <FontAwesome name="trash-o" size={24} color="#ff4d4d" />
            <View style={styles.rowTextContainer}>
              <Text style={[styles.rowTitle, { color: '#ff4d4d' }]}>Clear All Data</Text>
              <Text style={styles.rowSubtitle}>Deletes all saved playlists.</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { flex: 1, paddingHorizontal: 15 },
  header: { color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 30 },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 15,
    borderRadius: 8,
  },
  rowTextContainer: {
    marginLeft: 15,
  },
  rowTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  rowSubtitle: {
    color: 'gray',
    fontSize: 14,
    marginTop: 2,
  },
});
