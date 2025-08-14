// context/AudioContext.tsx
import { Audio, AVPlaybackStatus } from 'expo-av';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { suggestedSongs, Track } from '../data/mockData';

type AudioContextType = {
  sound: Audio.Sound | null;
  isPlaying: boolean;
  currentTrack: Track | null;
  playbackStatus: AVPlaybackStatus | null;
  repeatMode: 'off' | 'one';
  isShuffleOn: boolean;
  volume: number; 
  playNewSong: (track: Track, playlist?: Track[]) => Promise<void>;
  handlePlayPause: () => Promise<void>;
  toggleRepeatMode: () => void;
  toggleShuffle: () => void;
  playNextSong: () => Promise<void>;
  playPreviousSong: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>; 
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus | null>(null);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one'>('off');
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Track[]>(suggestedSongs);
  const [volume, setVolumeState] = useState(1); 

  const onPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPlaybackStatus(status);
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        if (repeatMode === 'one' && sound) {
          await sound.replayAsync();
        } else {
          await playNextSong();
        }
      }
    }
  };

  const playNewSong = async (track: Track, playlist?: Track[]) => {
    setCurrentPlaylist(playlist || suggestedSongs);
    if (sound) {
      await sound.unloadAsync();
    }
    setCurrentTrack(track);
    const { sound: newSound } = await Audio.Sound.createAsync(
      track.url,
      { shouldPlay: true, isLooping: repeatMode === 'one', volume: volume }, 
      onPlaybackStatusUpdate
    );
    setSound(newSound);
  };

  const handlePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const toggleRepeatMode = () => {
    const newMode = repeatMode === 'off' ? 'one' : 'off';
    setRepeatMode(newMode);
    sound?.setIsLoopingAsync(newMode === 'one');
  };

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };

  const findCurrentTrackIndex = () => {
    if (!currentTrack) return -1;
    return currentPlaylist.findIndex(t => t.id === currentTrack.id);
  };

  const playNextSong = async () => {
    const currentIndex = findCurrentTrackIndex();
    if (currentIndex === -1) return;
    let nextIndex;
    if (isShuffleOn) {
      do {
        nextIndex = Math.floor(Math.random() * currentPlaylist.length);
      } while (currentPlaylist.length > 1 && nextIndex === currentIndex);
    } else {
      nextIndex = (currentIndex + 1) % currentPlaylist.length;
    }
    await playNewSong(currentPlaylist[nextIndex], currentPlaylist);
  };

  const playPreviousSong = async () => {
    const currentIndex = findCurrentTrackIndex();
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    await playNewSong(currentPlaylist[prevIndex], currentPlaylist);
  };


  const setVolume = async (value: number) => {
    setVolumeState(value);
    if (sound) {
      await sound.setVolumeAsync(value);
    }
  };

  const value = {
    sound, isPlaying, currentTrack, playbackStatus, repeatMode, isShuffleOn, volume,
    playNewSong, handlePlayPause, toggleRepeatMode, toggleShuffle,
    playNextSong, playPreviousSong, setVolume,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};