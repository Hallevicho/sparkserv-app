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
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [messageTitle, setMessageTitle] = useState('');
  const [messageText, setMessageText] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setMessageTitle('Missing Information');
      setMessageText('Please fill out both email and password fields.');
      setModalVisible(true);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Dashboard'); // Successful login
    } catch (error) {
      setMessageTitle('Login Failed');
      if (error.code === 'auth/user-not-found') {
        setMessageText('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        setMessageText('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        setMessageText('Invalid email address.');
      } else {
        setMessageText(error.message);
      }
      setModalVisible(true);
    }
  };

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
      <View style={styles.shape1} />
      <View style={styles.shape2} />
      <View style={styles.shape3} />

      <View style={styles.header}>
        <Text style={styles.titleLight}>Welcome To</Text>
        <Text style={styles.titleBold}>SPARKSERV</Text>
        <Text style={styles.subtitle}>
          Your home appliances deserve care, and we’re here to deliver!
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Login to your Account</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.passwordLabelRow}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder=""
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.signInText}>
          Don’t have an account?{' '}
          <Text
            style={styles.signInLink}
            onPress={() => navigation.navigate('SignIn')}
          >
            Sign up
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  shape1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.22)',
    top: 50,
    left: -50,
  },
  shape2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.47)',
    bottom: -100,
    right: -100,
  },
  shape3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.56)',
    bottom: 120,
    left: -40,
  },
  header: { alignItems: 'center', marginBottom: 30, zIndex: 2 },
  titleLight: { fontSize: 24, fontWeight: '300', color: '#fff' },
  titleBold: { fontSize: 40, fontWeight: '800', color: '#fff', marginTop: 5 },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    zIndex: 2,
    marginBottom: 80,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
    }),
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1976D2',
  },
  inputGroup: { marginBottom: 20 },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 7, color: '#333' },
  forgotPassword: { fontSize: 14, color: '#007BFF', fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'web' ? 12 : 14,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  signInText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#444',
    marginTop: 20,
  },
  signInLink: { fontWeight: '700', color: '#007BFF' },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10, color: '#111' },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
