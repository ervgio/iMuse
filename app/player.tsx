// app/player.tsx
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAudio } from '../context/AudioContext';

export default function PlayerScreen() {
  const router = useRouter();
  const {
    sound,
    isPlaying,
    currentTrack,
    playbackStatus,
    handlePlayPause,
    repeatMode,
    isShuffleOn,
    toggleRepeatMode,
    toggleShuffle,
    playNextSong,
    playPreviousSong,
  } = useAudio();

  const [isSeeking, setIsSeeking] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

 
  if (playbackStatus?.isLoaded && !isSeeking) {
    if (sliderValue !== playbackStatus.positionMillis) {
      setSliderValue(playbackStatus.positionMillis);
    }
  }

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${(parseInt(seconds) < 10 ? '0' : '')}${seconds}`;
  };

  const durationMillis = playbackStatus?.isLoaded ? playbackStatus.durationMillis ?? 1 : 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="chevron-down" size={24} color="white" />
        </TouchableOpacity>

        {currentTrack?.artwork ? (
          <Image source={currentTrack.artwork} style={styles.artwork} />
        ) : (
          <View style={styles.artwork} />
        )}
        <Text style={styles.title}>{currentTrack?.title || 'Unknown Title'}</Text>
        <Text style={styles.artist}>{currentTrack?.artist || 'Unknown Artist'}</Text>

        <View style={styles.sliderContainer}>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={durationMillis}
            value={sliderValue}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#AAAAAA"
            thumbTintColor="#FFFFFF"
            onValueChange={(value) => {
              setIsSeeking(true);
              setSliderValue(value);
            }}
            onSlidingComplete={async (value) => {
              if (sound) {
                await sound.setPositionAsync(value);
              }
              setIsSeeking(false);
            }}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(sliderValue)}</Text>
            <Text style={styles.timeText}>{formatTime(durationMillis)}</Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={toggleShuffle}>
            <FontAwesome name="random" size={24} color={isShuffleOn ? '#1DB954' : 'gray'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={playPreviousSong}>
            <FontAwesome name="backward" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <FontAwesome name={isPlaying ? "pause-circle" : "play-circle"} size={72} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={playNextSong}>
            <FontAwesome name="forward" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleRepeatMode}>
            <FontAwesome name="repeat" size={24} color={repeatMode !== 'off' ? '#1DB954' : 'gray'} />
          </TouchableOpacity>
        </View>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#121212' },
    container: { flex: 1, alignItems: 'center', paddingHorizontal: 20 },
    backButton: { position: 'absolute', top: 20, left: 20, zIndex: 1 },
    artwork: {
      width: '100%',
      height: 350,
      backgroundColor: '#333',
      borderRadius: 10,
      marginTop: 80,
      marginBottom: 40
    },
    title: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    artist: { color: 'gray', fontSize: 18, marginTop: 8 },
    sliderContainer: { width: '100%', marginTop: 20 },
    timeContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    timeText: { color: 'gray', fontSize: 12 },
    controlsContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', marginTop: 30 },
});
