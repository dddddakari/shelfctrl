// app/(tabs)/items.tsx
import { View, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { Text, Card, Searchbar, Button, IconButton, TextInput, Chip } from 'react-native-paper';
import { useAppContext, Tag } from '../context/AppContext';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function ItemsScreen() {
  const { items, tags, addItem, profile, updateProfile } = useAppContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [image, setImage] = useState('');
  const [customField, setCustomField] = useState('');

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleSpotlight = (itemId: string) => {
    const isSpotlighted = profile.spotlightItems.includes(itemId);
    const newSpotlightItems = isSpotlighted
      ? profile.spotlightItems.filter(id => id !== itemId)
      : [...profile.spotlightItems, itemId];

    updateProfile({ spotlightItems: newSpotlightItems });
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleTag = (tag: Tag) => {
    setSelectedTags(prev =>
      prev.some(t => t.id === tag.id)
        ? prev.filter(t => t.id !== tag.id)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (title && description && image) {
      addItem({
        title,
        description,
        tags: selectedTags,
        image,
        customField: customField || undefined,
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedTags([]);
    setImage('');
    setCustomField('');
    setIsCreating(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerText}>
          My Items
        </Text>
      </View>

      <Searchbar
        placeholder="Search items..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      {isCreating ? (
        <ScrollView style={styles.formContainer}>
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            mode="outlined"
            multiline
          />

          <Button
            mode="outlined"
            onPress={handleImagePick}
            icon="image"
            style={styles.imageButton}
          >
            {image ? 'Change Image' : 'Add Image'}
          </Button>

          {image && (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          )}

          <Text style={styles.tagsLabel}>Select Tags:</Text>
          <View style={styles.tagsContainer}>
            {tags.map(tag => (
              <Chip
                key={tag.id}
                selected={selectedTags.some(t => t.id === tag.id)}
                onPress={() => toggleTag(tag)}
                style={[
                  styles.tag,
                  { backgroundColor: tag.color || '#7E8D85' },
                  selectedTags.some(t => t.id === tag.id) && styles.selectedTag
                ]}
                textStyle={styles.tagText}
              >
                {tag.name}
              </Chip>
            ))}
          </View>

          <TextInput
            label="Custom Field (Optional)"
            value={customField}
            onChangeText={setCustomField}
            style={styles.input}
            mode="outlined"
          />

          <View style={styles.formButtons}>
            <Button mode="outlined" onPress={resetForm} style={styles.cancelButton}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
              disabled={!title || !description || !image}
            >
              Add Item
            </Button>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              {item.image && <Image source={{ uri: item.image }} style={styles.itemImage} />}
              <Card.Content>
                <View style={styles.itemHeader}>
                  <Text variant="titleLarge" style={styles.cardTitle}>{item.title}</Text>
                  <IconButton
                    icon={profile.spotlightItems.includes(item.id) ? 'star' : 'star-outline'}
                    iconColor={profile.spotlightItems.includes(item.id) ? '#F4A261' : '#7E8D85'}
                    size={24}
                    onPress={() => toggleSpotlight(item.id)}
                  />
                </View>
                <Text variant="bodyMedium" style={styles.cardDescription}>{item.description}</Text>
                <View style={styles.tagsContainer}>
                  {item.tags.map(tag => (
                    <View
                      key={tag.id}
                      style={[styles.tag, { backgroundColor: tag.color || '#7E8D85' }]}
                    >
                      <Text style={styles.tagText}>{tag.name}</Text>
                    </View>
                  ))}
                </View>
                {item.customField && (
                  <View style={styles.customFieldContainer}>
                    <Text style={styles.customFieldLabel}>Details:</Text>
                    <Text style={styles.customFieldText}>{item.customField}</Text>
                  </View>
                )}
              </Card.Content>
            </Card>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items yet</Text>
              <Text style={styles.emptySubtext}>Add your first item to get started</Text>
              <Button
                mode="contained"
                onPress={() => setIsCreating(true)}
                style={styles.addButton}
                icon="plus"
              >
                Add Item
              </Button>
            </View>
          }
        />
      )}

      {!isCreating && items.length > 0 && (
        <Button
          mode="contained"
          onPress={() => setIsCreating(true)}
          style={styles.floatingButton}
          icon="plus"
        >
          Add Item
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F0F7F4' },
  header: { marginBottom: 12, fontWeight: 'bold', color: '#191f1b' },
  searchBar: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  formContainer: { flex: 1 },
  input: { marginBottom: 16, backgroundColor: 'white' },
  imageButton: { marginBottom: 16 },
  imagePreview: {
    width: '100%', height: 200, borderRadius: 8,
    marginBottom: 16, backgroundColor: '#eee'
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  tagsLabel: { fontWeight: 'bold', marginBottom: 8 },
  tagsContainer: {
    flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, gap: 8
  },
  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16 },
  selectedTag: { borderWidth: 2, borderColor: '#191f1b' },
  tagText: { color: 'white' },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: { flex: 1, marginRight: 8 },
  submitButton: { flex: 1 },
  card: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: { color: '#191f1b', fontWeight: 'bold', flex: 1 },
  cardDescription: { marginTop: 4, color: '#3C493F' },
  customFieldContainer: { marginTop: 8 },
  customFieldLabel: { fontWeight: 'bold', color: '#7E8D85' },
  customFieldText: { color: '#3C493F' },
  list: { paddingBottom: 80 },
  emptyContainer: { alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#191f1b' },
  emptySubtext: { fontSize: 14, color: '#7E8D85', marginBottom: 24 },
  addButton: {
    backgroundColor: '#7E8D85',
    borderRadius: 8,
    paddingVertical: 6,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#7E8D85',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 8,
    elevation: 4,
  },
});
