// apps/mobile/App.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Platform, Alert, Button } from 'react-native';
import { fetchCatalog, apiClient } from '@carshop/api-client';
import { colors } from '@carshop/design-tokens';
import { VehicleDTO } from '@carshop/schema';
import { CameraView, useCameraPermissions } from 'expo-camera';

// Use the computer's actual local IP address for physical devices on Wi-Fi
const NATIVE_API_URL = 'http://192.168.1.7:5000/api/v1';
apiClient.defaults.baseURL = NATIVE_API_URL;

export default function App() {
  const [inventory, setInventory] = useState<VehicleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchCatalog({ status: 'AVAILABLE' }),
      fetchCatalog({ status: 'PENDING_RESERVATION' })
    ])
      .then(([available, pending]) => setInventory([...available, ...pending]))
      .catch((err) => console.error("API Gateway unreachable:", err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleBarcodeScanned = ({ type, data }: { type: string, data: string }) => {
    if (scanned) return;
    setScanned(true);

    const match = inventory.find(v => v.vin === data);
    
    if (!match) {
      Alert.alert("SYSTEM ALERT", `VIN not found in active ledger: ${data}`, [
        { text: "OK", onPress: () => setScanned(false) }
      ]);
    } else if (match.status === 'PENDING_RESERVATION') {
      Alert.alert("MUTEX VERIFIED", `VIN matches Proforma. Release authorized for ${match.year} ${match.make} ${match.model}.`, [
        { text: "OK", onPress: () => setIsScanning(false) }
      ]);
    } else {
      Alert.alert("RELEASE DENIED", `Unit is currently ${match.status}. No active SLA found.`, [
        { text: "OK", onPress: () => setScanned(false) }
      ]);
    }
  };

  const openScanner = () => {
    if (!permission?.granted) {
      requestPermission();
      return;
    }
    setScanned(false);
    setIsScanning(true);
  };

  if (isScanning) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={StyleSheet.absoluteFill}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "code128", "code39", "code93", "ean13", "ean8", "upc_a", "upc_e"],
          }}
        />
        <View style={styles.scannerOverlay}>
          <View style={styles.scanTarget} />
          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsScanning(false)}>
            <Text style={styles.cancelText}>ABORT SCAN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderVehicle = ({ item }: { item: VehicleDTO }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.vinBadge}>{item.vin}</Text>
        <Text style={[styles.statusBadge, item.status === 'PENDING_RESERVATION' && styles.statusBadgePending]}>
          {item.status}
        </Text>
      </View>
      <Text style={styles.title}>{item.year} {item.make} {item.model}</Text>
      <Text style={styles.subtitle}>{item.exteriorColor} • {item.mileage} km</Text>
    
      <View style={styles.cardFooter}>
        <Text style={styles.price}>MAD {Number(item.price).toLocaleString()}</Text>
        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveText}>DETAILS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Aurora Field Command</Text>
          <Text style={styles.headerSubtitle}>Live Relational Terminal</Text>
        </View>
        <TouchableOpacity style={styles.scanButton} onPress={openScanner}>
          <Text style={styles.scanButtonText}>SCAN VIN</Text>
        </TouchableOpacity>
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
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', backgroundColor: colors.surface, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.primary },
  headerSubtitle: { fontSize: 12, color: '#64748b', marginTop: 4 },
  scanButton: { backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  scanButtonText: { color: colors.surface, fontWeight: 'bold', fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  loadingText: { textAlign: 'center', marginTop: 40, color: colors.primary, fontWeight: '600' },
  listContainer: { padding: 16, gap: 16 },
  card: { backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden', marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, paddingBottom: 8 },
  vinBadge: { fontSize: 10, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', backgroundColor: '#f1f5f9', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 4, color: '#64748b' },
  statusBadge: { fontSize: 10, fontWeight: 'bold', backgroundColor: '#dcfce7', color: '#15803d', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 4, overflow: 'hidden' },
  statusBadgePending: { backgroundColor: '#fef3c7', color: '#b45309' },
  title: { fontSize: 18, fontWeight: 'bold', color: colors.primary, paddingHorizontal: 16 },
  subtitle: { fontSize: 12, color: '#64748b', paddingHorizontal: 16, marginTop: 4, textTransform: 'capitalize' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#f8fafc', marginTop: 16, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  price: { fontSize: 18, fontWeight: 'bold', color: colors.primary },
  reserveButton: { backgroundColor: '#e2e8f0', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  reserveText: { color: colors.primary, fontWeight: 'bold', fontSize: 12 },
  cameraContainer: { flex: 1, backgroundColor: '#000' },
  scannerOverlay: { ...StyleSheet.absoluteFill, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  scanTarget: { width: 250, height: 250, borderWidth: 2, borderColor: '#10b981', backgroundColor: 'transparent' },
  cancelButton: { position: 'absolute', bottom: 50, backgroundColor: '#ef4444', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  cancelText: { color: 'white', fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
});
