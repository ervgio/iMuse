// components/ArtistAvatar.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

type ArtistAvatarProps = {
  name: string;
  image: any; 
};

const ArtistAvatar = ({ name, image }: ArtistAvatarProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({ pathname: "/artist", params: { name: name } });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={image} style={styles.avatar} />
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
    marginBottom: 8,
  },
  name: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ArtistAvatar;
