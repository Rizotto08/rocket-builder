import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { styles } from './common';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
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
      await login(email, password);
    } catch {
      Alert.alert('Login failed', 'Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DentalPro Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Button title="Login" onPress={onSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={{ marginTop: 16, color: '#2563eb' }}>No account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
}
