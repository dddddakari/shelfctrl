// app/(tabs)/items.tsx
import { View, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { Text, Card, Searchbar, Button, IconButton, TextInput, Chip } from 'react-native-paper';
import { Tag, useAppContext } from '../context/AppContext';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function ItemsScreen() {
  const { items, tags, addItem, profile, updateProfile } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  // Form state
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
        customField: customField || undefined
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
      </View>

      <Searchbar
        placeholder="Search items..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor="#7E8D85"
        placeholderTextColor="#B3BFB8"
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
            style={styles.imageButton}
            icon="image"
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
            placeholder="e.g. Price, Condition, etc."
          />

          <View style={styles.formButtons}>
            <Button
              mode="outlined"
              onPress={resetForm}
              style={styles.cancelButton}
            >
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
          renderItem={({ item }) => (
            <Card style={styles.card}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              )}
              <Card.Content>
                <View style={styles.itemHeader}>
                  <Text variant="titleLarge" style={styles.cardTitle}>
                    {item.title}
                  </Text>
                  <IconButton
                    icon={profile.spotlightItems.includes(item.id) ? 'star' : 'star-outline'}
                    iconColor={profile.spotlightItems.includes(item.id) ? '#F4A261' : '#7E8D85'}
                    size={24}
                    onPress={() => toggleSpotlight(item.id)}
                  />
                </View>
                <Text variant="bodyMedium" style={styles.cardDescription}>
                  {item.description}
                </Text>
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
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items yet</Text>
              <Text style={styles.emptySubtext}>Add your first item to get started</Text>
              <Button
                mode="contained"
                onPress={() => setIsCreating(true)}
                style={styles.addButton}
                labelStyle={styles.addButtonLabel}
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
          labelStyle={styles.floatingButtonLabel}
          icon="plus"
        >
          Add Item
        </Button>
      )}
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
    marginBottom: 24,
  },
  headerText: {
    color: '#191f1b',
    fontWeight: 'bold',
  },
  searchBar: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 0,
  },
  formContainer: {
    flex: 1,
    padding: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  imageButton: {
    marginBottom: 16,
    borderColor: '#7E8D85',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#F0F7F4',
  },
  tagsLabel: {
    fontSize: 16,
    color: '#3C493F',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTag: {
    borderWidth: 2,
    borderColor: '#191f1b',
  },
  tagText: {
    color: 'white',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    borderColor: '#7E8D85',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#7E8D85',
  },
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
  itemImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#F0F7F4',
  },
  cardTitle: {
    color: '#191f1b',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    flex: 1,
  },
  cardDescription: {
    color: '#3C493F',
    marginBottom: 12,
  },
  customFieldContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F7F4',
  },
  customFieldLabel: {
    fontWeight: 'bold',
    color: '#7E8D85',
    marginBottom: 4,
  },
  customFieldText: {
    color: '#3C493F',
  },
  list: {
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191f1b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#7E8D85',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#7E8D85',
    borderRadius: 8,
  },
  addButtonLabel: {
    color: 'white',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#7E8D85',
    borderRadius: 30,
    paddingVertical: 8,
    elevation: 4,
  },
  floatingButtonLabel: {
    color: 'white',
  },
});