import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import client from '../api/client';
import { styles } from './common';

export default function VisitFormScreen({ navigation }) {
  const [patientId, setPatientId] = useState('');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().slice(0, 16));
  const [treatment, setTreatment] = useState('');
  const [cost, setCost] = useState('0');
  const [status, setStatus] = useState('scheduled');
  const [error, setError] = useState('');

  useEffect(() => {
    client.get('/patients').then((res) => {
      if (res.data[0]) setPatientId(String(res.data[0].id));
    });
  }, []);

  const submit = async () => {
    if (!patientId || !treatment) {
      setError('Patient and treatment are required.');
      return;
    }
    await client.post('/visits', {
      patientId: Number(patientId),
      visitDate: new Date(visitDate).toISOString(),
      treatment,
      cost: Number(cost),
      status,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Visit</Text>
      <TextInput style={styles.input} value={patientId} onChangeText={setPatientId} placeholder="Patient ID" keyboardType="numeric" />
      <TextInput style={styles.input} value={visitDate} onChangeText={setVisitDate} placeholder="Visit Date (YYYY-MM-DDTHH:mm)" />
      <TextInput style={styles.input} value={treatment} onChangeText={setTreatment} placeholder="Treatment" />
      <TextInput style={styles.input} value={cost} onChangeText={setCost} placeholder="Cost" keyboardType="decimal-pad" />
      <TextInput style={styles.input} value={status} onChangeText={setStatus} placeholder="Status" />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Button title="Save Visit" onPress={submit} />
    </View>
  );
}
