import React, { useState } from 'react';
import { Button, TextInput, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAppContext } from './context/AppContext';
import { Link } from 'expo-router';

const LoginPage = () => {
  const { setIsLoggedIn } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../components/ShelfCtrl_Logo.png')} style={styles.logo} />
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
        <Text>
          Don't have an account? <Link style={styles.linkText} href="/signup">Sign Up</Link>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#4d5d51',
  },
  logo: {
    width: 240,
    height: 166,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
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
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default LoginPage;
