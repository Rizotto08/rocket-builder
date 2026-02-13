import React, { useCallback, useState } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import client from '../api/client';
import { styles } from './common';

export default function PatientsListScreen({ navigation }) {
  const [patients, setPatients] = useState([]);

  const load = useCallback(() => {
    client.get('/patients').then((res) => setPatients(res.data)).catch(() => {});
  }, []);

  useFocusEffect(load);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patients</Text>
      <Button title="Add Patient" onPress={() => navigation.navigate('PatientForm')} />
      <FlatList
        data={patients}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PatientDetail', { id: item.id })}>
            <Text>{item.firstName} {item.lastName}</Text>
            <Text>{item.phone}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
