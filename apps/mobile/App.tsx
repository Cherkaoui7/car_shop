// apps/mobile/App.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { fetchCatalog, apiClient } from '@carshop/api-client';
import { colors } from '@carshop/design-tokens';
import { VehicleDTO } from '@carshop/schema';

// Use the computer's actual local IP address for physical devices on Wi-Fi
const NATIVE_API_URL = 'http://192.168.1.13:5000/api/v1';
apiClient.defaults.baseURL = NATIVE_API_URL;

export default function App() {
  const [inventory, setInventory] = useState<VehicleDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatalog()
      .then((data) => setInventory(data))
      .catch((err) => console.error("API Gateway unreachable:", err.message))
      .finally(() => setLoading(false));
  }, []);

  const renderVehicle = ({ item }: { item: VehicleDTO }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.vinBadge}>{item.vin}</Text>
        <Text style={styles.statusBadge}>{item.status}</Text>
      </View>
      <Text style={styles.title}>{item.year} {item.make} {item.model}</Text>
      <Text style={styles.subtitle}>{item.exteriorColor} • {item.mileage} km</Text>
    
      <View style={styles.cardFooter}>
        <Text style={styles.price}>MAD {Number(item.price).toLocaleString()}</Text>
        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveText}>RESERVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aurora Field Command</Text>
        <Text style={styles.headerSubtitle}>Live Relational Terminal</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Syncing Gateway...</Text>
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
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', backgroundColor: colors.surface },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.primary },
  headerSubtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  loadingText: { textAlign: 'center', marginTop: 40, color: colors.primary, fontWeight: '600' },
  listContainer: { padding: 16, gap: 16 },
  card: { backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden', marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, paddingBottom: 8 },
  vinBadge: { fontSize: 10, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', backgroundColor: '#f1f5f9', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 4, color: '#64748b' },
  statusBadge: { fontSize: 10, fontWeight: 'bold', backgroundColor: '#dcfce7', color: '#15803d', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 4, overflow: 'hidden' },
  title: { fontSize: 18, fontWeight: 'bold', color: colors.primary, paddingHorizontal: 16 },
  subtitle: { fontSize: 12, color: '#64748b', paddingHorizontal: 16, marginTop: 4, textTransform: 'capitalize' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#f8fafc', marginTop: 16, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  price: { fontSize: 18, fontWeight: 'bold', color: colors.primary },
  reserveButton: { backgroundColor: colors.secondary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  reserveText: { color: colors.surface, fontWeight: 'bold', fontSize: 12 },
});
