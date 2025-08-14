// components/SongCard.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAudio } from '../context/AudioContext';
import { Track, suggestedSongs } from '../data/mockData';

type SongCardProps = {
  track: Track;
};

const SongCard = ({ track }: SongCardProps) => {
  const router = useRouter();
  const { playNewSong } = useAudio();

  const handlePress = async () => {
    await playNewSong(track, suggestedSongs);
    router.push('/player');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={track.artwork} style={styles.artwork} />
      <Text style={styles.title} numberOfLines={1}>{track.title}</Text>
      <Text style={styles.artist} numberOfLines={1}>{track.artist}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 15,
  },
  artwork: { 
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#333',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  artist: {
    color: 'gray',
    fontSize: 12,
  },
});

export default SongCard;
