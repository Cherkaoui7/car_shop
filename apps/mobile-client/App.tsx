import React from 'react';
import { StyleSheet, View } from 'react-native';
import { apiClient } from '@carshop/api-client';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Use the EXPO_PUBLIC_API_URL from .env or fallback
const NATIVE_API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.11:5000/api/v1';
apiClient.defaults.baseURL = NATIVE_API_URL;

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
