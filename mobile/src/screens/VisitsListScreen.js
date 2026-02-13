import React, { useCallback, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import client from '../api/client';
import { styles } from './common';

export default function VisitsListScreen({ navigation }) {
  const [visits, setVisits] = useState([]);

  const load = useCallback(() => {
    client.get('/visits').then((res) => setVisits(res.data)).catch(() => {});
  }, []);

  useFocusEffect(load);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visits</Text>
      <Button title="Add Visit" onPress={() => navigation.navigate('VisitForm')} />
      <FlatList
        data={visits}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.patient?.firstName} {item.patient?.lastName}</Text>
            <Text>{new Date(item.visitDate).toLocaleString()} - {item.treatment}</Text>
            <Text>${item.cost} ({item.status})</Text>
          </View>
        )}
      />
    </View>
  );
}
