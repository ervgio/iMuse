// app/category.tsx
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchResultRow from '../components/SearchResultRow';
import { suggestedSongs } from '../data/mockData';

export default function CategoryScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const categoryName = name as string;

 
  const tracksInCategory = suggestedSongs.filter(
    song => song.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.header}>{categoryName || 'Category'}</Text>

        {tracksInCategory.length > 0 ? (
          <FlatList
            data={tracksInCategory}
            keyExtractor={(item) => item.id}
           
            renderItem={({ item }) => <SearchResultRow track={item} playlist={tracksInCategory} />}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No songs found in this category.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { flex: 1, paddingHorizontal: 15 },
  backButton: { marginTop: 20, marginBottom: 20 },
  header: { color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: 'gray', fontSize: 16 },
});
