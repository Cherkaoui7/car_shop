import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { colors } from '@carshop/design-tokens';
import { VehicleDTO } from '@carshop/schema';

export type RootStackParamList = {
  Home: undefined;
  Details: { vehicle: VehicleDTO };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const CyberTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: '#f8fafc',
    border: colors.surfaceBorder,
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={CyberTheme}>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: colors.surfaceLight },
          headerTintColor: colors.primary,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={({ route }) => ({ title: `${route.params.vehicle.make} ${route.params.vehicle.model}` })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
