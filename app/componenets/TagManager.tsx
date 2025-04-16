// components/TagManager.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { useAppContext } from '../context/AppContext';

export default function TagManager() {
  const { tags, addTag, removeTag } = useAppContext();

  const [newTagName, setNewTagName] = useState('');

  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    addTag({ name: newTagName.trim() });
    setNewTagName('');
  };

    const updateTag = (id: string, updatedData: { name: string }) => {
        const tagIndex = tags.findIndex((tag) => tag.id === id);
        if (tagIndex === -1) return;

        const updatedTags = [...tags];
        updatedTags[tagIndex] = { ...updatedTags[tagIndex], ...updatedData };
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Tags</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={newTagName}
          onChangeText={setNewTagName}
          placeholder="New tag"
          style={styles.input}
        />
        <Button onPress={handleAddTag} mode="contained">
          Add
        </Button>
      </View>

      <View style={styles.tagsContainer}>
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            onClose={() => removeTag(tag.id)}
            onPress={() => {
              const newName = prompt('Rename tag', tag.name);
              if (newName) updateTag(tag.id, { name: newName });
            }}
            style={styles.chip}
          >
            {tag.name}
          </Chip>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 8,
    paddingVertical: 4,
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    margin: 4,
  },
});
