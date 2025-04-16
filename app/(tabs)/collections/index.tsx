// app/(tabs)/collections/index.tsx
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { Card, IconButton, Searchbar, Menu, Divider } from 'react-native-paper';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function CollectionsScreen() {
  const { collections, deleteCollection } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'a-z' | 'date'>('a-z');
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredCollections = collections
    .filter(collection =>
      collection.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'a-z') {
        return a.title.localeCompare(b.title);
      } else {
        // For date sorting, you'll need to add createdAt to your Collection type
        return 0;
      }
    });

  return (
    <View style={styles.container}>
      
      <View style={styles.controls}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.search}
        />
        
        <Menu
          visible={sortMenuVisible}
          onDismiss={() => setSortMenuVisible(false)}
          anchor={
            <TouchableOpacity
              style={styles.sortButton}
              onPress={() => setSortMenuVisible(true)}
            >
              <Text>Sort by: {sortBy === 'a-z' ? 'A-Z' : 'Date'}</Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item
            title="A-Z"
            onPress={() => {
              setSortBy('a-z');
              setSortMenuVisible(false);
            }}
          />
          <Divider />
          <Menu.Item
            title="Date"
            onPress={() => {
              setSortBy('date');
              setSortMenuVisible(false);
            }}
          />
        </Menu>
      </View>

      <FlatList
        data={filteredCollections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/collections/${item.id}`} asChild>
            <Card style={styles.card}>
              <Card.Title
                title={item.title}
                subtitle={item.description}
                right={(props) => (
                  <Menu
                    visible={activeMenuId === item.id}
                    onDismiss={() => setActiveMenuId(null)}
                    anchor={
                      <IconButton
                        {...props}
                        icon="dots-vertical"
                        onPress={() => setActiveMenuId(item.id)}
                      />
                    }
                  >
                    <Menu.Item
                      onPress={() => {
                        setActiveMenuId(null);
                        // Implement edit functionality here
                      }}
                      title="Edit"
                      leadingIcon="pencil"
                    />
                    <Menu.Item
                      onPress={() => {
                        setActiveMenuId(null);
                        deleteCollection(item.id);
                      }}
                      title="Delete"
                      leadingIcon="delete"
                    />
                  </Menu>
                )}
              />
              <Card.Content>
                <View style={styles.tagsContainer}>
                  {item.tags.map(tag => (
                    <View
                      key={tag.id}
                      style={[styles.tag, { backgroundColor: tag.color || '#E0E0E0' }]}
                    >
                      <Text style={styles.tagText}>{tag.name}</Text>
                    </View>
                  ))}
                </View>
              </Card.Content>
            </Card>
          </Link>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No collections yet. Add one!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F7F4',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#191f1b',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  search: {
    flex: 1,
    marginRight: 8,
    backgroundColor: 'white',
  },
  sortButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
});