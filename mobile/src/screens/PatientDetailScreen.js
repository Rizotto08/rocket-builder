import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import client from '../api/client';
import { styles } from './common';

export default function PatientDetailScreen({ route, navigation }) {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    client.get(`/patients/${route.params.id}`).then((res) => setPatient(res.data)).catch(() => {});
  }, [route.params.id]);

  const remove = async () => {
    await client.delete(`/patients/${route.params.id}`);
    navigation.goBack();
  };

  if (!patient) return <View style={styles.container}><Text>Loading...</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{patient.firstName} {patient.lastName}</Text>
      <View style={styles.card}><Text>Phone: {patient.phone}</Text><Text>Email: {patient.email || '-'}</Text></View>
      <Button title="Edit" onPress={() => navigation.navigate('PatientForm', { patient })} />
      <View style={{ height: 8 }} />
      <Button title="Delete" onPress={remove} color="#dc2626" />
    </View>
  );
}
