// /app/tabs/index.tsx (Your TabLayout)
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const { isLoggedIn, logout } = useAppContext();
  const router = useRouter();

  // If not logged in, redirect to the login screen
  if (!isLoggedIn) {
    router.push('/login');
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#D3D3D3',
        tabBarStyle: {
          backgroundColor: '#7E8D85', // Secondary color
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      }}
    >
      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
      />

      {/* Collections Tab */}
      <Tabs.Screen
        name="collections/index"
        options={{
          title: 'MY COLLECTIONS',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="collections" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#191f1b',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32.5,
            color: 'white', // Title color
          },
           headerTitleAlign: 'left'
        }}
      />

      {/* Add Item Tab (BIG CENTERED BUTTON) */}
      <Tabs.Screen
        name="collections/new"
        options={{
          title: '',
          tabBarIcon: () => (
            <View style={{
              backgroundColor: 'white',
              width: 75,
              height: 75,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15,
              borderWidth: 4,
              borderColor: '#7E8D85',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 4,
            }}>
              <MaterialIcons name="add" size={40} color="#B3BFB8" />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
            {/* Items Tab */}
            <Tabs.Screen
        name="items"
        options={{
          title: 'MY ITEMS',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#191f1b',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32.5,
            color: 'white', // Title color
          },
           headerTitleAlign: 'left'
        }}
      />

      {/* Settings Tab */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'SETTINGS',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#191f1b',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32.5,
            color: 'white', // Title color
          },
          headerTitleAlign: 'left',
        }}
      />
    </Tabs>
    
  );
}
