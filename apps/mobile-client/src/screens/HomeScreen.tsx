import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { fetchCatalog, resolveImageUrl, reserveVehicle } from '@carshop/api-client';
import { colors } from '@carshop/design-tokens';
import { VehicleDTO } from '@carshop/schema';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Details: { vehicle: VehicleDTO };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export function HomeScreen({ navigation }: Props) {
  const [inventory, setInventory] = useState<VehicleDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatalog({ status: 'AVAILABLE' })
      .then((data) => setInventory(data))
      .catch((err) => console.error("API Gateway unreachable:", err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleReserve = (vehicle: VehicleDTO) => {
    Alert.alert(
      "CONFIRMATION SYSTÈME",
      `Réserver le véhicule ${vehicle.make} ${vehicle.model} ?\nUn acompte de 10 000 MAD sera requis.`,
      [
        { text: "ANNULER", style: "cancel" },
        { 
          text: "CONFIRMER", 
          onPress: () => {
            reserveVehicle({ vehicleId: vehicle.id, userId: "29e63199-4a34-4fb5-89a6-4d2c4cf61126", depositAmount: 10000 })
              .then(() => {
                Alert.alert("SUCCÈS", "Véhicule verrouillé et réservé. Notre équipe va vous contacter.");
                setInventory(prev => prev.filter(v => v.id !== vehicle.id));
              })
              .catch(err => {
                Alert.alert("ERREUR", "Impossible de réserver : " + err.message);
              });
          }
        }
      ]
    );
  };

  const renderVehicle = ({ item }: { item: VehicleDTO }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Details', { vehicle: item })}
    >
      <View style={styles.cardContent}>
        <View style={styles.reticleTopLeft} />
        <View style={styles.reticleBottomRight} />
        
        <Image 
          source={{ uri: resolveImageUrl(item.imageUrl) }} 
          style={styles.image} 
          resizeMode="cover"
        />
        
        <View style={styles.cardOverlay}>
          <Text style={styles.vinBadge}>{item.vin}</Text>
          <Text style={styles.title}>{item.make} {item.model}</Text>
          <Text style={styles.subtitle}>{item.year} • {item.exteriorColor} • {item.mileage} km</Text>
          
          <View style={styles.cardFooter}>
            <Text style={styles.price}>{Number(item.price).toLocaleString()} MAD</Text>
            <TouchableOpacity style={styles.reserveButton} onPress={() => handleReserve(item)}>
              <Text style={styles.reserveText}>RESERVER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>COLLECTION <Text style={{ color: colors.primary }}>PREMIUM</Text></Text>
        <Text style={styles.headerSubtitle}>MARKETPLACE ONLINE</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>INITIALIZING CONNECTION...</Text>
      ) : (
        <FlatList
          data={inventory}
          keyExtractor={(item) => item.id}
          renderItem={renderVehicle}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: { padding: 24, borderBottomWidth: 1, borderBottomColor: colors.surfaceBorder, backgroundColor: colors.surfaceLight },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#f8fafc', letterSpacing: -1 },
  headerSubtitle: { fontSize: 10, color: colors.primary, marginTop: 4, letterSpacing: 2, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  loadingText: { textAlign: 'center', marginTop: 60, color: colors.primary, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 12, letterSpacing: 2 },
  listContainer: { padding: 16, gap: 24 },
  card: { backgroundColor: colors.surface, borderRadius: 0, borderWidth: 1, borderColor: colors.surfaceBorder, overflow: 'hidden', marginBottom: 24 },
  cardContent: { position: 'relative' },
  reticleTopLeft: { position: 'absolute', top: 10, left: 10, width: 20, height: 20, borderTopWidth: 1, borderLeftWidth: 1, borderColor: colors.primary, zIndex: 10 },
  reticleBottomRight: { position: 'absolute', bottom: 10, right: 10, width: 20, height: 20, borderBottomWidth: 1, borderRightWidth: 1, borderColor: colors.primary, zIndex: 10 },
  image: { width: '100%', height: 220, opacity: 0.8 },
  cardOverlay: { padding: 16, backgroundColor: 'rgba(15, 23, 42, 0.95)' },
  vinBadge: { fontSize: 9, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: colors.primary, paddingHorizontal: 6, paddingVertical: 2, backgroundColor: 'rgba(6, 182, 212, 0.1)', alignSelf: 'flex-start', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#f8fafc' },
  subtitle: { fontSize: 12, color: '#94a3b8', marginTop: 4, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  price: { fontSize: 16, fontWeight: 'bold', color: colors.primary, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  reserveButton: { backgroundColor: 'transparent', paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: colors.primary },
  reserveText: { color: colors.primary, fontWeight: 'bold', fontSize: 11, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', letterSpacing: 1 },
});
