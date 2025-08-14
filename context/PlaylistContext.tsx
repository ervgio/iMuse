// context/PlaylistContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Track } from '../data/mockData';

export type Playlist = {
  id: string;
  name: string;
  tracks: Track[];
};

type PlaylistContextType = {
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  deletePlaylist: (playlistId: string) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  clearAllPlaylists: () => void; 
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

const PLAYLISTS_STORAGE_KEY = 'user_playlists';

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const savedPlaylists = await AsyncStorage.getItem(PLAYLISTS_STORAGE_KEY);
        if (savedPlaylists) {
          setPlaylists(JSON.parse(savedPlaylists));
        }
      } catch (error) {
        console.error("Failed to load playlists from storage", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPlaylists();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const savePlaylists = async () => {
        try {
          await AsyncStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(playlists));
        } catch (error) {
          console.error("Failed to save playlists to storage", error);
        }
      };
      savePlaylists();
    }
  }, [playlists, isLoading]);


  const createPlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: name,
      tracks: [],
    };
    setPlaylists(prev => [...prev, newPlaylist]);
  };

  const addTrackToPlaylist = (playlistId: string, track: Track) => {
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id === playlistId) {
          if (p.tracks.some(t => t.id === track.id)) {
            Alert.alert("Already Exists", `${track.title} is already in this playlist.`);
            return p;
          }
          Alert.alert("Success", `Added ${track.title} to ${p.name}`);
          return { ...p, tracks: [...p.tracks, track] };
        }
        return p;
      })
    );
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
  };

  const removeTrackFromPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id === playlistId) {
          const updatedTracks = p.tracks.filter(t => t.id !== trackId);
          return { ...p, tracks: updatedTracks };
        }
        return p;
      })
    );
  };


  const clearAllPlaylists = () => {
    setPlaylists([]);
  };


  const value = {
    playlists,
    createPlaylist,
    addTrackToPlaylist,
    deletePlaylist,
    removeTrackFromPlaylist,
    clearAllPlaylists, 
  };

  return <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>;
};

export const usePlaylists = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylists must be used within a PlaylistProvider');
  }
  return context;
};
