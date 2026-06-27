// apps/mobile/App.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Platform, Alert, Dimensions, Animated, Easing } from 'react-native';
import { fetchCatalog, apiClient } from '@carshop/api-client';
import { colors } from '@carshop/design-tokens';
import { VehicleDTO } from '@carshop/schema';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { CyberRain } from './src/components/CyberRain';

// Use the EXPO_PUBLIC_API_URL from .env or fallback
const NATIVE_API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.11:5000/api/v1';
apiClient.defaults.baseURL = NATIVE_API_URL;

const { width } = Dimensions.get('window');

export default function App() {
  const [inventory, setInventory] = useState<VehicleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  // Animation for scanner line
  const scanLineAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isScanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 240, // Height of the target box minus line height
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ])
      ).start();
    }
  }, [isScanning, scanLineAnim]);

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
          <Text style={styles.scannerText}>ALIGN VIN BARCODE</Text>
          
          {/* HUD Target */}
          <View style={styles.scanTarget}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            {/* Animated Laser Line */}
            <Animated.View style={[styles.scanLaser, { transform: [{ translateY: scanLineAnim }] }]} />
          </View>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsScanning(false)} activeOpacity={0.8}>
            <View style={styles.cancelButtonInner}>
              <Text style={styles.cancelText}>ABORT SCAN</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderVehicle = ({ item }: { item: VehicleDTO }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.vinContainer}>
          <Text style={styles.vinBadgeLabel}>VIN</Text>
          <Text style={styles.vinBadge}>{item.vin}</Text>
        </View>
        <Text style={[styles.statusBadge, item.status === 'PENDING_RESERVATION' && styles.statusBadgePending]}>
          {item.status.replace('_', ' ')}
        </Text>
      </View>
      
      <Text style={styles.title}>{item.year} {item.make} {item.model}</Text>
      <Text style={styles.subtitle}>{item.exteriorColor} • {item.mileage} km</Text>
    
      <View style={styles.cardFooter}>
        <Text style={styles.price}>MAD {Number(item.price).toLocaleString()}</Text>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
          <Text style={styles.actionText}>DETAILS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CyberRain />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>AURORA FIELD CMD</Text>
          <Text style={styles.headerSubtitle}>LIVE RELATIONAL TERMINAL</Text>
        </View>
        <TouchableOpacity style={styles.scanButton} onPress={openScanner} activeOpacity={0.8}>
          <Text style={styles.scanButtonText}>SCAN VIN</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Syncing Gateway...</Text>
        </View>
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
  header: { 
    padding: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(6, 182, 212, 0.3)', 
    backgroundColor: 'rgba(15, 23, 42, 0.8)', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    zIndex: 10
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: colors.primary, letterSpacing: 1 },
  headerSubtitle: { fontSize: 10, color: '#94a3b8', marginTop: 4, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', letterSpacing: 1 },
  scanButton: { backgroundColor: colors.surface, padding: 2, borderRadius: 8, borderWidth: 1, borderColor: colors.primary },
  scanButtonText: { 
    color: colors.primary, 
    fontWeight: 'bold', 
    fontSize: 12, 
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: 'rgba(2, 6, 23, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  loadingText: { color: colors.primary, fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 14, letterSpacing: 2 },
  listContainer: { padding: 16, gap: 16, paddingBottom: 40, zIndex: 10 },
  card: { 
    backgroundColor: 'rgba(15, 23, 42, 0.8)', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: 'rgba(6, 182, 212, 0.2)', 
    overflow: 'hidden' 
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, paddingBottom: 8 },
  vinContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#020617', borderWidth: 1, borderColor: colors.surfaceBorder, borderRadius: 4, overflow: 'hidden' },
  vinBadgeLabel: { fontSize: 10, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: colors.primary, paddingHorizontal: 6, paddingVertical: 4, backgroundColor: 'rgba(6, 182, 212, 0.1)', fontWeight: 'bold' },
  vinBadge: { fontSize: 10, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#94a3b8', paddingHorizontal: 6, paddingVertical: 4 },
  statusBadge: { fontSize: 10, fontWeight: 'bold', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.3)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, overflow: 'hidden' },
  statusBadgePending: { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' },
  title: { fontSize: 18, fontWeight: '900', color: '#f8fafc', paddingHorizontal: 16, letterSpacing: -0.5 },
  subtitle: { fontSize: 12, color: '#94a3b8', paddingHorizontal: 16, marginTop: 4, textTransform: 'capitalize', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'rgba(2, 6, 23, 0.5)', marginTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(6, 182, 212, 0.1)' },
  price: { fontSize: 16, fontWeight: '900', color: colors.primary },
  actionButton: { backgroundColor: colors.surface, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.surfaceBorder },
  actionText: { color: colors.primary, fontWeight: 'bold', fontSize: 10, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', letterSpacing: 1 },
  
  // Scanner Styles
  cameraContainer: { flex: 1, backgroundColor: '#020617' },
  scannerOverlay: { ...StyleSheet.absoluteFill as any, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(2, 6, 23, 0.7)' },
  scannerText: { position: 'absolute', top: 120, color: colors.primary, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 14, fontWeight: 'bold', letterSpacing: 3 },
  scanTarget: { width: 250, height: 250, position: 'relative' },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: colors.primary },
  topLeft: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3 },
  topRight: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3 },
  scanLaser: { width: '100%', height: 2, backgroundColor: '#ef4444', shadowColor: '#ef4444', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 5 },
  cancelButton: { position: 'absolute', bottom: 60, padding: 2, borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: '#ef4444' },
  cancelButtonInner: { backgroundColor: 'rgba(15, 23, 42, 0.9)', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 10 },
  cancelText: { color: '#ef4444', fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', letterSpacing: 2 },
});
