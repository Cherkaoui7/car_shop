import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { colors } from '@carshop/design-tokens';
import { CyberRain } from '../components/CyberRain';

export function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CyberRain />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>NOTRE HISTOIRE</Text>
          </View>
          
          <Text style={styles.title}>
            L'Excellence Automobile au{'\n'}
            <Text style={styles.titleHighlight}>Maroc</Text>
          </Text>
          
          <Text style={styles.subtitle}>
            Bienvenue chez Car Store. Nous sommes avant tout des passionnés de belles mécaniques, et notre but est simple : vous offrir la meilleure expérience possible pour l'achat de votre prochain véhicule premium.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>COMMENT TOUT A COMMENCÉ</Text>
          <Text style={styles.cardText}>
            Tout est parti d'un constat évident : pourquoi l'achat d'une voiture de luxe au Maroc devrait-il être un processus long et compliqué ? Depuis nos locaux à Technopolis (Rabat), nous avons voulu créer un endroit où trouver et acheter une voiture de prestige est aussi fluide et agréable que de la conduire.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.dot} />
            <Text style={styles.cardTitle}>ON NE LAISSE RIEN AU HASARD</Text>
          </View>
          <Text style={styles.cardText}>
            Avant qu'une voiture n'arrive sur notre site, notre équipe l'examine sous toutes les coutures. On passe en revue plus de 150 points de contrôle pour être absolument certains que vous n'aurez aucune mauvaise surprise le jour de la réception.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.dot} />
            <Text style={styles.cardTitle}>REMISE DES CLÉS VIP</Text>
          </View>
          <Text style={styles.cardText}>
            L'expérience ne s'arrête pas à un clic sur internet. Dès que tout est validé, on s'occupe de la logistique. On vous livre la voiture directement devant chez vous, en toute discrétion, et on prend le temps de vous expliquer comment tout fonctionne.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>UN ACHAT SIMPLIFIÉ</Text>
          <Text style={styles.cardText}>
            › Réservation en quelques clics{'\n'}
            › Plateforme ultra-sécurisée{'\n'}
            › Vos données restent 100% privées{'\n'}
            › Démarches simplifiées
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, zIndex: 10, paddingBottom: 60 },
  header: { alignItems: 'center', marginBottom: 32 },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    marginBottom: 20,
  },
  badgeText: { color: colors.primary, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 10, fontWeight: 'bold', letterSpacing: 2 },
  title: { fontSize: 32, fontWeight: '900', color: '#f8fafc', textAlign: 'center', marginBottom: 20, letterSpacing: -1 },
  titleHighlight: { color: colors.primary },
  subtitle: { color: '#94a3b8', fontSize: 14, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', textAlign: 'center', lineHeight: 22 },
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginRight: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#f8fafc', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', textTransform: 'uppercase', marginBottom: 12 },
  cardText: { color: '#94a3b8', fontSize: 13, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', lineHeight: 22 },
});
