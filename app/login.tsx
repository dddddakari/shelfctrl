// app/login.tsx
import React, { useState } from 'react';
import { Button, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from './context/AppContext';
import { Link } from 'expo-router';

const LoginPage = () => {
  const { login } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Both fields are required');
      return;
    }
    const success = login(username, password);
    if (!success) {
      setError('Invalid credentials');
      return;
    }
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
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
          Don't have an account?{' '}
          <Link href="/signup" style={styles.linkText}>Sign Up</Link>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: {
    height: 50, borderColor: '#ddd', borderWidth: 1, marginBottom: 15,
    paddingHorizontal: 10, borderRadius: 5,
  },
  signUpLink: { marginTop: 15, alignItems: 'center' },
  linkText: { color: '#007BFF', fontWeight: 'bold' },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 15 },
});

export default LoginPage;
