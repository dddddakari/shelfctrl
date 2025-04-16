import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function AddItemForm({ onSuccess }: { onSuccess?: () => void }) {
  const { collections, addItemToCollection } = useAppContext();
  const [collectionId, setCollectionId] = useState(collections[0]?.id || '');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fees, setFees] = useState('');
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (!collectionId || !name || !title) {
      Alert.alert('Missing fields', 'Please fill in all required fields.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name,
      title,
      description,
      fees,
      tags: [],
      image: '',
      textDetails: '',
      createdAt: new Date(),
    };

    addItemToCollection(collectionId, newItem);
    if (onSuccess) onSuccess();
  };

  return (
    <View>
      <Text style={styles.label}>Collection ID</Text>
      <TextInput
        style={styles.input}
        value={collectionId}
        onChangeText={setCollectionId}
        placeholder="Collection ID"
      />
      <Text style={styles.label}>Item Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" />
      <Text style={styles.label}>Item Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description" />
      <Text style={styles.label}>Fees</Text>
      <TextInput style={styles.input} value={fees} onChangeText={setFees} placeholder="Fees" keyboardType="numeric" />

      <Button title="Add Item" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
  },
  label: {
    marginTop: 16,
    fontWeight: '600',
    color: '#333',
  },
});
