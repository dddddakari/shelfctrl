// app/(tabs)/collections/[id]/index.tsx
import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Chip, IconButton } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '../../app/context/AppContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function EditCollectionScreen() {
  const { id } = useLocalSearchParams();
  const { 
    collections, 
    updateCollection,
    addTagToCollection,
    updateCollectionTag,
    removeTagFromCollection
  } = useAppContext();
  
  const collection = collections.find(c => c.id === id);
  
  const [form, setForm] = useState({
    title: collection?.title || '',
    description: collection?.description || '',
    newTagName: '',
    newTagColor: '#A2E3C4',
  });

  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editingTagName, setEditingTagName] = useState('');

  const handleUpdate = () => {
    if (collection) {
      updateCollection(collection.id, {
        title: form.title,
        description: form.description,
      });
      router.back();
    }
  };

  const handleAddTag = () => {
    if (form.newTagName.trim() && id) {
      addTagToCollection(id as string, {
        name: form.newTagName,
        color: form.newTagColor,
      });
      setForm(prev => ({ ...prev, newTagName: '' }));
    }
  };

  const startEditingTag = (tag: { id: string; name: string }) => {
    setEditingTagId(tag.id);
    setEditingTagName(tag.name);
  };

  const saveEditedTag = () => {
    if (editingTagId && id) {
      updateCollectionTag(id as string, editingTagId, {
        name: editingTagName,
      });
      setEditingTagId(null);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    if (id) {
      removeTagFromCollection(id as string, tagId);
    }
  };

  if (!collection) {
    return (
      <View style={styles.container}>
        <Text>Collection not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Edit Collection
      </Text>
      
      <TextInput
        label="Title"
        mode="outlined"
        style={styles.input}
        value={form.title}
        onChangeText={(text) => setForm({...form, title: text})}
      />
      
      <TextInput
        label="Description"
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
        value={form.description}
        onChangeText={(text) => setForm({...form, description: text})}
      />

      <Text style={styles.sectionTitle}>Tags</Text>
      <View style={styles.tagsContainer}>
        {collection.tags.map(tag => (
          <View key={tag.id} style={styles.tagWrapper}>
            {editingTagId === tag.id ? (
              <View style={styles.tagEditContainer}>
                <TextInput
                  value={editingTagName}
                  onChangeText={setEditingTagName}
                  style={styles.tagInput}
                />
                <IconButton
                  icon="check"
                  size={20}
                  onPress={saveEditedTag}
                />
              </View>
            ) : (
              <Chip
                style={[styles.tag, { backgroundColor: tag.color }]}
                textStyle={styles.tagText}
                onPress={() => startEditingTag(tag)}
                onClose={() => handleRemoveTag(tag.id)}
              >
                {tag.name}
              </Chip>
            )}
          </View>
        ))}
      </View>

      <View style={styles.addTagContainer}>
        <TextInput
          label="New Tag"
          mode="outlined"
          style={[styles.input, styles.tagInput]}
          value={form.newTagName}
          onChangeText={(text) => setForm({...form, newTagName: text})}
        />
        <Button 
          mode="contained" 
          style={styles.addTagButton}
          onPress={handleAddTag}
          disabled={!form.newTagName.trim()}
        >
          Add
        </Button>
      </View>

      <Button 
        mode="contained" 
        style={styles.button}
        onPress={handleUpdate}
        disabled={!form.title}
      >
        Save Changes
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F0F7F4',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#191f1b',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3C493F',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 8,
  },
  tagWrapper: {
    marginBottom: 8,
  },
  tag: {
    marginRight: 8,
  },
  tagText: {
    color: 'white',
  },
  tagEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
  },
  addTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addTagButton: {
    marginLeft: 10,
    height: 56,
    justifyContent: 'center',
    backgroundColor: '#7E8D85',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#7E8D85',
  },
});