import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function SettingsScreen() {
  const { logout } = useAppContext();

  const handleLogout = () => {
    logout();
    // You can navigate to a login screen or reset state here if needed
    console.log('User logged out');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Land Acknowledgement</Text>
      <Text style={styles.paragraph}>
        We acknowledge that we live, work, and play on the traditional territories of the people of the Treaty 7 region in Southern Alberta, which includes the Blackfoot Confederacy (comprising the Siksika, Piikani, and Kainai First Nations), as well as the Tsuut’ina First Nation and the Stoney Nakoda (including the Chiniki, Bearspaw, and Wesley First Nations). The City of Calgary is also home to Métis Nation of Alberta, Region 3.
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  logoutButton: {
    backgroundColor: '#A2E3C4',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
