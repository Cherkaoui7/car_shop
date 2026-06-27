import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { LandingScreen } from '../screens/LandingScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
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

// Auth Stack Navigator
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: colors.surfaceLight },
        headerTintColor: colors.primary,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <AuthStack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <AuthStack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }} 
      />
    </AuthStack.Navigator>
  );
}

// Main Bottom Tab Navigator
export type RootTabParamList = {
  Accueil: undefined;
  Collection: undefined;
  'À Propos': undefined;
  Contact: undefined;
  Profil: undefined;
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

import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function AppNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer theme={CyberTheme}>
      <Tab.Navigator
        initialRouteName="Accueil"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#020617', // Solid dark color
            borderTopColor: 'rgba(6, 182, 212, 0.3)',
            borderTopWidth: 1,
            minHeight: 65 + (Platform.OS === 'ios' ? insets.bottom : Math.min(insets.bottom, 15)), 
            paddingBottom: 10 + (Platform.OS === 'ios' ? insets.bottom : Math.min(insets.bottom, 15)),
            paddingTop: 10,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: '#475569',
          tabBarLabelStyle: {
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
            fontSize: 10,
            fontWeight: 'bold',
            marginTop: 4,
            paddingBottom: Platform.OS === 'ios' ? 0 : 4,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';
            
            if (route.name === 'Accueil') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Collection') {
              iconName = focused ? 'car-sport' : 'car-sport-outline';
            } else if (route.name === 'À Propos') {
              iconName = focused ? 'business' : 'business-outline';
            } else if (route.name === 'Contact') {
              iconName = focused ? 'mail' : 'mail-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Accueil" component={LandingScreen} />
        <Tab.Screen name="Collection" component={CollectionStackNavigator} />
        <Tab.Screen name="À Propos" component={AboutScreen} />
        <Tab.Screen name="Contact" component={ContactScreen} />
        <Tab.Screen name="Profil" component={AuthStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
