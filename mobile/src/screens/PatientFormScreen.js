import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import client from '../api/client';
import { styles } from './common';

export default function PatientFormScreen({ route, navigation }) {
  const existing = route.params?.patient;
  const [firstName, setFirstName] = useState(existing?.firstName || '');
  const [lastName, setLastName] = useState(existing?.lastName || '');
  const [phone, setPhone] = useState(existing?.phone || '');
  const [email, setEmail] = useState(existing?.email || '');
  const [error, setError] = useState('');

  const submit = async () => {
    if (!firstName || !lastName || !phone) {
      setError('First name, last name, and phone are required.');
      return;
    }
    const payload = { firstName, lastName, phone, email };
    if (existing) {
      await client.put(`/patients/${existing.id}`, payload);
    } else {
      await client.post('/patients', payload);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{existing ? 'Edit' : 'Add'} Patient</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First name" />
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last name" />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Button title="Save" onPress={submit} />
    </View>
  );
}
