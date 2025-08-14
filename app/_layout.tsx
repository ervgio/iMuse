// app/_layout.tsx
import { Stack } from 'expo-router';
import { AudioProvider } from '../context/AudioContext';
import { PlaylistProvider } from '../context/PlaylistContext';
export default function RootLayout() {
  return (
    
    <PlaylistProvider>
      <AudioProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AudioProvider>
    </PlaylistProvider>
  );
}
