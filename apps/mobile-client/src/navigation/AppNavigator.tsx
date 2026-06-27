import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { LandingScreen } from '../screens/LandingScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { colors } from '@carshop/design-tokens';
import { VehicleDTO } from '@carshop/schema';

// This is the nested stack for the Collection tab
export type CollectionStackParamList = {
  CollectionHome: undefined;
  Details: { vehicle: VehicleDTO };
};

const CollectionStack = createNativeStackNavigator<CollectionStackParamList>();

function CollectionStackNavigator() {
  return (
    <CollectionStack.Navigator
      initialRouteName="CollectionHome"
      screenOptions={{
        headerStyle: { backgroundColor: colors.surfaceLight },
        headerTintColor: colors.primary,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <CollectionStack.Screen 
        name="CollectionHome" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <CollectionStack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={({ route }) => ({ title: `${route.params.vehicle.make} ${route.params.vehicle.model}` })}
      />
    </CollectionStack.Navigator>
  );
}

// Main Bottom Tab Navigator
export type RootTabParamList = {
  Accueil: undefined;
  Collection: undefined;
  'À Propos': undefined;
  Contact: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

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
      <Tab.Navigator
        initialRouteName="Accueil"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.surfaceBorder,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: '#64748b',
          tabBarLabelStyle: {
            fontFamily: 'monospace',
            fontSize: 10,
          }
        }}
      >
        <Tab.Screen 
          name="Accueil" 
          component={LandingScreen} 
          options={{ tabBarIcon: () => null }}
        />
        <Tab.Screen 
          name="Collection" 
          component={CollectionStackNavigator} 
          options={{ tabBarIcon: () => null }}
        />
        <Tab.Screen 
          name="À Propos" 
          component={AboutScreen} 
          options={{ tabBarIcon: () => null }}
        />
        <Tab.Screen 
          name="Contact" 
          component={ContactScreen} 
          options={{ tabBarIcon: () => null }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
