// components/CategoryCard.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type CategoryCardProps = {
  name: string;
  color: string;
};

const CategoryCard = ({ name, color }: CategoryCardProps) => {
  const router = useRouter(); 


  const handlePress = () => {
    router.push({ pathname: "/category", params: { name: name } });
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={handlePress} 
    >
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default CategoryCard;
