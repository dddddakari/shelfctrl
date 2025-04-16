// context/AppContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useRouter } from 'expo-router';

export type Tag = {
  id: string;
  name: string;
  color?: string;
};

export type Item = {
  name: string;
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  image: string;
  customField?: string;
  createdAt: Date;
};

export type Collection = {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  items: Item[];
  image?: string;
  createdAt: Date;
};

type Profile = {
  name: string;
  username: string;
  bio: string;
  avatar?: string;
  spotlightItems: string[];
};

type AppContextType = {
  profile: Profile;
  collections: Collection[];
  items: Item[];
  tags: Tag[];
  isLoggedIn: boolean;
  updateProfile: (newProfile: Partial<Profile>) => void;
  addCollection: (collection: { title: string; description: string; image?: string }) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  addItem: (item: {
    title: string;
    description: string;
    tags: Tag[];
    image: string;
    customField?: string;
  }) => void;
  addTagToCollection: (collectionId: string, tag: Omit<Tag, 'id'>) => void;
  updateCollectionTag: (collectionId: string, tagId: string, updates: Partial<Tag>) => void;
  removeTagFromCollection: (collectionId: string, tagId: string) => void;
  addItemToCollection: (collectionId: string, item: Item) => void;
  logout: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>({
    name: 'Bruno Bucciaratti',
    username: 'Arrivederci',
    bio: 'This taste … is the taste of a liar! Giorno Giovanna!',
    avatar: undefined,
    spotlightItems: ['1'],
  });

  const [collections, setCollections] = useState<Collection[]>([
    {
      id: '1',
      title: 'Vinyl Records',
      description: 'My precious vinyl collection',
      tags: [
        { id: '1', name: 'Music', color: '#A2E3C4' },
        { id: '2', name: 'Vintage', color: '#F4A261' },
      ],
      items: [],
      createdAt: new Date(),
    },
  ]);

  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: 'Favorite', color: '#A2E3C4' },
    { id: '2', name: 'Rare', color: '#F4A261' },
    { id: '3', name: 'Signed', color: '#E76F51' },
    { id: '4', name: 'Limited', color: '#2A9D8F' },
    { id: '5', name: 'First Edition', color: '#264653' },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const updateProfile = (newProfile: Partial<Profile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  const addCollection = ({
    title,
    description,
    tags = [],
    image,
  }: {
    title: string;
    description: string;
    tags?: Tag[];
    image?: string;
  }) => {
    const newCollection: Collection = {
      id: Date.now().toString(),
      title,
      description,
      tags,
      items: [],
      image,
      createdAt: new Date(),
    };
    setCollections(prev => [...prev, newCollection]);
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections(prev =>
      prev.map(collection =>
        collection.id === id ? { ...collection, ...updates } : collection
      )
    );
  };

  const deleteCollection = (id: string) => {
    setCollections(prev => prev.filter(collection => collection.id !== id));
  };

  const addItem = ({
    title,
    description,
    tags,
    image,
    customField,
  }: {
    title: string;
    description: string;
    tags: Tag[];
    image: string;
    customField?: string;
  }) => {
    const newItem: Item = {
      id: Date.now().toString(),
      title,
      description,
      tags,
      image,
      customField,
      createdAt: new Date(),
      name: ''
    };

    // Add to all collections for now (we'll implement collection-specific adding later)
    setCollections(prev =>
      prev.map(collection => ({
        ...collection,
        items: [...collection.items, newItem],
      }))
    );
  };

  const addItemToCollection = (collectionId: string, item: Item) => {
    setCollections(prev =>
      prev.map(collection =>
        collection.id === collectionId
          ? { ...collection, items: [...collection.items, item] }
          : collection
      )
    );
  };

  const addTagToCollection = (collectionId: string, tag: Omit<Tag, 'id'>) => {
    const newTag = { ...tag, id: Date.now().toString() };
    setCollections(prev =>
      prev.map(collection =>
        collection.id === collectionId
          ? { ...collection, tags: [...collection.tags, newTag] }
          : collection
      )
    );
  };

  const updateCollectionTag = (collectionId: string, tagId: string, updates: Partial<Tag>) => {
    setCollections(prev =>
      prev.map(collection =>
        collection.id === collectionId
          ? {
              ...collection,
              tags: collection.tags.map(tag =>
                tag.id === tagId ? { ...tag, ...updates } : tag
              ),
            }
          : collection
      )
    );
  };

  const removeTagFromCollection = (collectionId: string, tagId: string) => {
    setCollections(prev =>
      prev.map(collection =>
        collection.id === collectionId
          ? {
              ...collection,
              tags: collection.tags.filter(tag => tag.id !== tagId),
            }
          : collection
      )
    );
  };

  const logout = () => {
    setIsLoggedIn(false);
    setProfile({
      name: '',
      username: '',
      bio: '',
      avatar: undefined,
      spotlightItems: [],
    });
    setCollections([]);
    setTags([]);
  };

  const allItems = collections.flatMap(c => c.items);

  return (
    <AppContext.Provider
      value={{
        profile,
        collections,
        items: allItems,
        tags,
        isLoggedIn,
        updateProfile,
        addCollection,
        updateCollection,
        deleteCollection,
        addItem,
        addTagToCollection,
        updateCollectionTag,
        removeTagFromCollection,
        addItemToCollection,
        logout,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);