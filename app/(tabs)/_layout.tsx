// app/(tabs)/_layout.tsx
import { FontAwesome } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAudio } from '../../context/AudioContext';


const MiniPlayer = () => {
  const router = useRouter();
  const { currentTrack, isPlaying, handlePlayPause } = useAudio();


  if (!currentTrack) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.miniPlayerContainer} onPress={() => router.push('/player')}>
      <View style={styles.textContainer}>
        <Text style={styles.miniPlayerTitle} numberOfLines={1}>{currentTrack.title}</Text>
        <Text style={styles.miniPlayerArtist} numberOfLines={1}>{currentTrack.artist}</Text>
      </View>
      <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
        <FontAwesome name={isPlaying ? 'pause' : 'play'} size={22} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  const { currentTrack } = useAudio();
  const isMiniPlayerVisible = !!currentTrack;

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#1DB954',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#191414',
            borderTopWidth: 0,
            
            height: isMiniPlayerVisible ? 100 : Platform.OS === 'ios' ? 80 : 60,
          },
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="music" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
      </Tabs>
 
      <MiniPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  miniPlayerContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 60,
    left: 0,
    right: 0,
    backgroundColor: '#282828',
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#404040',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  miniPlayerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  miniPlayerArtist: {
    color: 'gray',
    fontSize: 12,
  },
  playPauseButton: {
    padding: 5,
  },
});
