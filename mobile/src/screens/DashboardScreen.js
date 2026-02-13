import React, { useEffect, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { styles } from './common';

export default function DashboardScreen({ navigation }) {
  const { logout } = useAuth();
  const [stats, setStats] = useState({ totalPatients: 0, upcomingVisitsToday: 0, revenueToday: 0 });

  useEffect(() => {
    client.get('/dashboard').then((res) => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.card}><Text>Total Patients: {stats.totalPatients}</Text></View>
      <View style={styles.card}><Text>Upcoming Visits Today: {stats.upcomingVisitsToday}</Text></View>
      <View style={styles.card}><Text>Revenue Today: ${stats.revenueToday}</Text></View>
      <TouchableOpacity onPress={() => navigation.navigate('Patients')}><Text style={{ color: '#2563eb', marginBottom: 10 }}>Manage Patients</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Visits')}><Text style={{ color: '#2563eb', marginBottom: 10 }}>Manage Visits</Text></TouchableOpacity>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
