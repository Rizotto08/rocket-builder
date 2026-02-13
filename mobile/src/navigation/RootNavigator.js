import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PatientsListScreen from '../screens/PatientsListScreen';
import PatientDetailScreen from '../screens/PatientDetailScreen';
import PatientFormScreen from '../screens/PatientFormScreen';
import VisitsListScreen from '../screens/VisitsListScreen';
import VisitFormScreen from '../screens/VisitFormScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { token } = useAuth();

  if (!token) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Patients" component={PatientsListScreen} />
      <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />
      <Stack.Screen name="PatientForm" component={PatientFormScreen} />
      <Stack.Screen name="Visits" component={VisitsListScreen} />
      <Stack.Screen name="VisitForm" component={VisitFormScreen} />
    </Stack.Navigator>
  );
}
