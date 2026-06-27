import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView, Platform } from 'react-native';
import { colors } from '@carshop/design-tokens';
import { VehicleDTO } from '@carshop/schema';
import { resolveImageUrl } from '@carshop/api-client';
import { CyberAccordion } from '../components/CyberAccordion';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Details: { vehicle: VehicleDTO };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const BooleanRow = ({ label, value }: { label: string, value: boolean }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, { color: value ? '#10b981' : '#ef4444' }]}>{value ? '✔' : '✖'}</Text>
  </View>
);

export function DetailsScreen({ route }: Props) {
  const { vehicle } = route.params;

  const registrationFee = 24424; // Mocked
  const finalPrice = Number(vehicle.price) + registrationFee;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerImageContainer}>
          <Image source={{ uri: resolveImageUrl(vehicle.imageUrl) }} style={styles.headerImage} />
          <View style={styles.imageOverlay} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.make}>{vehicle.make}</Text>
            <Text style={styles.model}>{vehicle.model}</Text>
            <Text style={styles.price}>{Number(vehicle.price).toLocaleString()} MAD</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          
          <CyberAccordion title="Tarifs et prix" defaultExpanded={true}>
            <InfoRow label="Prix en showroom" value={`${Number(vehicle.price).toLocaleString()} Dhs`} />
            <InfoRow label="Frais d'immatriculation" value={`${registrationFee.toLocaleString()} Dhs`} />
            <InfoRow label="Prix clé en main" value={`${finalPrice.toLocaleString()} Dhs`} />
          </CyberAccordion>

          <CyberAccordion title="Fiche technique" defaultExpanded={true}>
            <InfoRow label="Marque" value={vehicle.make} />
            <InfoRow label="Modèle" value={vehicle.model} />
            <InfoRow label="Année" value={vehicle.year.toString()} />
            <InfoRow label="Transmission" value="Automatique" />
            <InfoRow label="Carburant" value="Essence / Hybride" />
            <InfoRow label="Nombre de portes" value="5" />
            <InfoRow label="Nombre de places" value="5" />
          </CyberAccordion>

          <CyberAccordion title="Motorisation & Performance">
            <InfoRow label="Puissance réelle (ch)" value={`${Math.floor(Math.random() * 200 + 300)} ch`} />
            <InfoRow label="Puissance fiscale (CV)" value={`${Math.floor(Math.random() * 10 + 10)} cv`} />
            <InfoRow label="Transmission" value="4 roues motrices (4x4 ou 4WD)" />
            <InfoRow label="Vitesse maximale" value="250.0 km/h" />
            <InfoRow label="Consommation mixte" value="8.5 L/100km" />
          </CyberAccordion>

          <CyberAccordion title="Dimensions & Capacité">
            <InfoRow label="Longueur" value="4960 mm" />
            <InfoRow label="Largeur" value="1970 mm" />
            <InfoRow label="Hauteur" value="1700 mm" />
            <InfoRow label="Volume de coffre" value="500 L" />
            <InfoRow label="Poids à vide" value="2525 kg" />
          </CyberAccordion>

          <CyberAccordion title="Design & Confort">
            <BooleanRow label="Jantes en alliage" value={true} />
            <InfoRow label="Taille des jantes" value="21 pouces" />
            <BooleanRow label="Feux LED" value={true} />
            <BooleanRow label="Toit panoramique" value={true} />
            <BooleanRow label="Sièges chauffants" value={true} />
            <BooleanRow label="Accès mains libres" value={true} />
          </CyberAccordion>

          <CyberAccordion title="Technologie & Sécurité">
            <BooleanRow label="Caméras 360°" value={true} />
            <BooleanRow label="Régulateur de vitesse adaptatif" value={true} />
            <BooleanRow label="Surveillance angle mort" value={true} />
            <BooleanRow label="Freinage d'urgence autonome" value={true} />
            <BooleanRow label="Alerte franchissement de ligne" value={true} />
          </CyberAccordion>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerImageContainer: {
    height: 250,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill as any,
    backgroundColor: 'rgba(2, 6, 23, 0.6)',
  },
  headerTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  make: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  model: {
    color: '#f8fafc',
    fontSize: 32,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  price: {
    color: '#f8fafc',
    fontSize: 18,
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  detailsContainer: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoLabel: {
    color: '#94a3b8',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    flex: 1,
  },
  infoValue: {
    color: '#f8fafc',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    textAlign: 'right',
    flex: 1,
  },
});
