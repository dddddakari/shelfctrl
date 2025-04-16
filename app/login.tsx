import React, { useState } from 'react';
import { Button, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from './context/AppContext'; // Adjust path accordingly
import { Link } from 'expo-router';

const LoginPage = () => {
  const { setIsLoggedIn } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true); // Set login state to true
      // Navigate to the home screen or wherever you need to go
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      
      <TouchableOpacity style={styles.signUpLink}>
        <Text>Don't have an account? <Link style={styles.linkText} href={'/signup'}>Sign Up</Link></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  signUpLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#7E8D85',
    fontWeight: 'bold',
  },
});

export default LoginPage;
