import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { styles } from './common';

export default function SignupScreen() {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async () => {
    if (!email.includes('@') || password.length < 6) {
      setError('Enter valid email and password (min 6 chars).');
      return;
    }
    try {
      setError('');
      await signup(email, password);
    } catch {
      Alert.alert('Signup failed', 'Could not create account.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Button title="Signup" onPress={onSubmit} />
    </View>
  );
}
