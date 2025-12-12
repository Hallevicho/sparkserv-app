import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from './firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Sign({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [messageTitle, setMessageTitle] = useState('');
  const [messageText, setMessageText] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setMessageTitle('Missing Information');
      setMessageText('Please fill out all fields.');
      setModalVisible(true);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessageTitle('Success!');
      setMessageText('Your account has been created!');
      setModalVisible(true);

      setTimeout(() => {
        navigation.replace('Login');
      }, 1500);
    } catch (error) {
      setMessageTitle('Sign-up Failed');
      if (error.code === 'auth/email-already-in-use') {
        setMessageText('This email is already registered.');
      } else if (error.code === 'auth/invalid-email') {
        setMessageText('Invalid email format.');
      } else if (error.code === 'auth/weak-password') {
        setMessageText('Password must be at least 6 characters.');
      } else {
        setMessageText(error.message);
      }
      setModalVisible(true);
    }
  };

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleLight}>Create Account</Text>
        <Text style={styles.titleBold}>SPARKSERV</Text>
        <Text style={styles.subtitle}>
          Join SPARKSERV and manage your appliances with ease!
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sign Up</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Log in
          </Text>
        </Text>
      </View>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.backdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{messageTitle}</Text>
            <Text style={styles.modalText}>{messageText}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative' },
  header: { alignItems: 'center', marginBottom: 30 },
  titleLight: { fontSize: 24, fontWeight: '300', color: '#fff' },
  titleBold: { fontSize: 40, fontWeight: '800', color: '#fff', marginTop: 5 },
  subtitle: { fontSize: 16, fontWeight: '500', color: '#fff', marginTop: 5, textAlign: 'center' },
  card: { width: '100%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 20, padding: 25, elevation: 5, zIndex: 2, marginBottom: 80, ...(Platform.OS === 'web' && { boxShadow: '0px 4px 15px rgba(0,0,0,0.2)' }) },
  cardTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 30, color: '#1976D2' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 7, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 12, paddingHorizontal: 15, paddingVertical: Platform.OS === 'web' ? 12 : 14, fontSize: 15, backgroundColor: '#fafafa' },
  signupButton: { backgroundColor: '#007BFF', paddingVertical: 15, borderRadius: 12, marginTop: 10 },
  signupButtonText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
  loginText: { textAlign: 'center', fontSize: 14, color: '#444', marginTop: 20 },
  loginLink: { fontWeight: '700', color: '#007BFF' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { width: 300, backgroundColor: '#fff', borderRadius: 15, padding: 20, alignItems: 'center', elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10, color: '#111' },
  modalText: { fontSize: 16, color: '#555', marginBottom: 20, textAlign: 'center' },
  modalButton: { backgroundColor: '#007BFF', paddingVertical: 10, borderRadius: 8, width: '100%' },
  modalButtonText: { color: '#fff', fontWeight: '600', textAlign: 'center', fontSize: 16 },
});
