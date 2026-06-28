import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal } from 'react-native';
import { colors } from '@carshop/design-tokens';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function RegisterScreen({ navigation }: any) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création du compte');
      }

      // Show success modal
      setShowSuccess(true);
      
      // Delay redirection
      setTimeout(() => {
        setShowSuccess(false);
        navigation.navigate('Login');
      }, 2000);
      
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>NOUVEAU DOSSIER</Text>
            </View>
            <Text style={styles.title}>
              Créer un <Text style={styles.titleHighlight}>Compte</Text>
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* Modal de Succès */}
            <Modal
              visible={showSuccess}
              transparent={true}
              animationType="fade"
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalIconContainer}>
                    <Text style={styles.modalIconText}>✓</Text>
                  </View>
                  <Text style={styles.modalTitle}>Dossier Créé</Text>
                  <Text style={styles.modalText}>Compte enregistré avec succès. Redirection vers l'interface de connexion...</Text>
                </View>
              </View>
            </Modal>

            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.inputLabel}>PRÉNOM</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="John" 
                  placeholderTextColor="#475569"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.inputLabel}>NOM</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Doe" 
                  placeholderTextColor="#475569"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>

            <Text style={styles.inputLabel}>IDENTIFIANT (EMAIL)</Text>
            <TextInput 
              style={styles.input} 
              placeholder="votre@email.com" 
              placeholderTextColor="#475569"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.inputLabel}>MOT DE PASSE</Text>
            <TextInput 
              style={styles.input} 
              placeholder="••••••••" 
              placeholderTextColor="#475569"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Text style={styles.inputLabel}>CONFIRMER MOT DE PASSE</Text>
            <TextInput 
              style={styles.input} 
              placeholder="••••••••" 
              placeholderTextColor="#475569"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleRegister}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>AUTORISER CRÉATION</Text>
              </View>
            </TouchableOpacity>
            
            <View style={styles.footer}>
              <Text style={styles.footerText}>DÉJÀ PILOTE ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footerLink}>CONNEXION</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, zIndex: 10, paddingBottom: 60, justifyContent: 'center', flexGrow: 1 },
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
  title: { fontSize: 32, fontWeight: '900', color: '#f8fafc', textAlign: 'center', letterSpacing: -1, textTransform: 'uppercase' },
  titleHighlight: { color: colors.primary },
  formContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: 20,
    borderRadius: 12,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  inputLabel: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#94a3b8',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#f8fafc',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.surface,
    padding: 1,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonContent: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 11,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  buttonText: { color: colors.primary, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 12, fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#94a3b8',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 10,
  },
  footerLink: {
    color: colors.primary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 10,
    fontWeight: 'bold',
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.5)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.5)',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIconText: {
    color: '#10b981',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  modalText: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 18,
  }
});
