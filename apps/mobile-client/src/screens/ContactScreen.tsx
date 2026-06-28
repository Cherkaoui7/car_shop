import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal } from 'react-native';
import { colors } from '@carshop/design-tokens';

export function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSend = () => {
    // Show success modal
    setShowSuccess(true);
    // Clear inputs
    setName('');
    setEmail('');
    setMessage('');
    
    // Hide modal after 4 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
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
              <Text style={styles.badgeText}>NOUS CONTACTER</Text>
            </View>
            <Text style={styles.title}>
              Contactez-<Text style={styles.titleHighlight}>Nous</Text>
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.card}>
              <Text style={styles.cardSubtitle}>NOS BUREAUX</Text>
              <Text style={styles.cardTitle}>Bureau Principal</Text>
              <Text style={styles.cardText}>
                Technopolis Park{'\n'}Rabat 11100{'\n'}Maroc
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardSubtitle}>APPELEZ-NOUS</Text>
              <Text style={styles.cardTitle}>+212 537 000 000</Text>
              <Text style={styles.cardText}>contact@carstore.com</Text>
            </View>
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
                  <Text style={styles.modalTitle}>Message Envoyé !</Text>
                  <Text style={styles.modalText}>Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</Text>
                </View>
              </View>
            </Modal>

            <Text style={styles.inputLabel}>VOTRE NOM</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Comment vous appelez-vous ?" 
              placeholderTextColor="#475569" 
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.inputLabel}>VOTRE E-MAIL</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Pour qu'on puisse vous répondre" 
              placeholderTextColor="#475569"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.inputLabel}>VOTRE MESSAGE</Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Dites-nous tout..." 
              placeholderTextColor="#475569"
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
            />

            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSend}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>ENVOYER LE MESSAGE</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  title: { fontSize: 32, fontWeight: '900', color: '#f8fafc', textAlign: 'center', letterSpacing: -1, textTransform: 'uppercase' },
  titleHighlight: { color: colors.primary },
  infoContainer: { marginBottom: 32, gap: 16 },
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: 20,
  },
  cardSubtitle: { fontSize: 10, color: colors.primary, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold', marginBottom: 4 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#f8fafc', marginBottom: 8 },
  cardText: { color: '#94a3b8', fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', lineHeight: 18 },
  formContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: 20,
  },
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
