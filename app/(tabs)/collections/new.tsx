// [tabs]/collections/new.tsx
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text, Chip } from 'react-native-paper';
import { Tag, useAppContext } from '../../context/AppContext';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function NewCollectionScreen() {
  const { addCollection, tags } = useAppContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    addCollection({
      title,
      description,
      tags: tags.filter(t => selectedTags.includes(t.id)),
    });
    
    router.back();
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Collection Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        mode="outlined"
      />
      
      <TextInput
        label="Description (Optional)"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        mode="outlined"
        multiline
        numberOfLines={3}
      />

      <Text style={styles.sectionTitle}>Tags</Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag: Tag) => (
          <Chip
            key={tag.id}
            selected={selectedTags.includes(tag.id)}
            onPress={() => toggleTag(tag.id)}
            style={[
              styles.tag,
              selectedTags.includes(tag.id) && { backgroundColor: tag.color || '#A2E3C4' }
            ]}
            textStyle={selectedTags.includes(tag.id) ? { color: 'white' } : undefined}
          >
            {tag.name}
          </Chip>
        ))}
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={!title.trim()}
      >
        Create Collection
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F7F4',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3C493F',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    borderColor: '#3C493F',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#7E8D85',
  },
});