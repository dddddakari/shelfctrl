import { useState } from 'react';
import { View, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Appbar } from 'react-native-paper';
import { useAppContext } from '../context/AppContext';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

export default function EditProfileScreen() {
  const { profile, items, updateProfile } = useAppContext();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: profile.name,
    username: profile.username,
    bio: profile.bio,
    avatar: profile.avatar,
    spotlightItems: [...profile.spotlightItems]
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpotlightToggle = (itemId: string) => {
    setFormData(prev => {
      const newSpotlight = prev.spotlightItems.includes(itemId)
        ? prev.spotlightItems.filter(id => id !== itemId)
        : [...prev.spotlightItems, itemId];
      return { ...prev, spotlightItems: newSpotlight };
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange('avatar', result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    updateProfile(formData);
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: formData.avatar || 'https://i.imgur.com/oaEqEdn_d.webp' }}
            style={styles.avatar}
          />
          <View style={styles.editAvatarIcon}>
            <MaterialCommunityIcons name="camera" size={24} color="white" />
          </View>
        </TouchableOpacity>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder="Your name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={formData.username}
            onChangeText={(text) => handleChange('username', text)}
            placeholder="@username"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={formData.bio}
            onChangeText={(text) => handleChange('bio', text)}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Spotlight Items</Text>
          <Text style={styles.subLabel}>Select up to 3 items to feature</Text>
          <View style={styles.spotlightGrid}>
            {items.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.spotlightOption,
                  formData.spotlightItems.includes(item.id) && styles.spotlightSelected
                ]}
                onPress={() => handleSpotlightToggle(item.id)}
              >
                <Text 
                  style={[
                    styles.spotlightOptionText,
                    formData.spotlightItems.includes(item.id) && styles.spotlightOptionTextSelected
                  ]}
                >
                  {item.title || item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button 
          mode="contained" 
          style={styles.saveButton}
          onPress={handleSubmit}
        >
          Save Changes
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7F4',
  },
  header: {
    backgroundColor: '#191f1b',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#7E8D85',
  },
  editAvatarIcon: {
    position: 'absolute',
    right: 10,
    bottom: 30,
    backgroundColor: '#7E8D85',
    borderRadius: 20,
    padding: 8,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C493F',
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 12,
    color: '#7E8D85',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#7E8D85',
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  spotlightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  spotlightOption: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7E8D85',
  },
  spotlightSelected: {
    backgroundColor: '#7E8D85',
  },
  spotlightOptionText: {
    color: '#3C493F',
  },
  spotlightOptionTextSelected: {
    color: 'white',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#7E8D85',
    padding: 8,
  },
});