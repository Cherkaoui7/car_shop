import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { colors } from '@carshop/design-tokens';
import { CyberRain } from '../components/CyberRain';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type Props = {
  navigation: BottomTabNavigationProp<any>;
};

export function LandingScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CyberRain />
      
      <View style={styles.content}>
        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>MARKETPLACE ONLINE</Text>
          </View>
          
          <Text style={styles.title}>
            COLLECTION AUTOMOBILE{'\n'}
            <Text style={styles.titleHighlight}>PREMIUM</Text>
          </Text>
          
          <Text style={styles.subtitle}>
            Trouvez la voiture de vos rêves parmi notre sélection exclusive de véhicules premium au Maroc. Achat sécurisé, accompagnement sur-mesure et livraison directe chez vous.
          </Text>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Collection')}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <View style={styles.buttonDot} />
              <Text style={styles.buttonText}>VOIR LA COLLECTION</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>04</Text>
            <Text style={styles.statLabel}>Villes{'\n'}Desservies</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>24/48h</Text>
            <Text style={styles.statLabel}>Livraison{'\n'}Rapide</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>100%</Text>
            <Text style={styles.statLabel}>Transactions{'\n'}Sécurisées</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'space-between', padding: 24, zIndex: 10 },
  hero: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    marginBottom: 24,
  },
  badgeText: { color: colors.primary, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 10, fontWeight: 'bold', letterSpacing: 2 },
  title: { fontSize: 36, fontWeight: '900', color: '#f8fafc', textAlign: 'center', marginBottom: 24, letterSpacing: -1 },
  titleHighlight: { color: colors.primary },
  subtitle: { color: '#94a3b8', fontSize: 14, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', textAlign: 'center', marginBottom: 40, lineHeight: 22 },
  button: {
    backgroundColor: colors.surface,
    padding: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.5)',
  },
  buttonContent: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  buttonText: { color: colors.primary, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 12, fontWeight: 'bold' },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceBorder,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
  },
  statBox: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 24, fontWeight: '900', color: '#f8fafc', marginBottom: 4 },
  statLabel: { fontSize: 9, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#64748b', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 },
});
