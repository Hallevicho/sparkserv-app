import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [messageTitle, setMessageTitle] = useState('');
  const [messageText, setMessageText] = useState('');

  const handleSignIn = () => {
    if (!username || !email || !password || !confirmPassword) {
      setMessageTitle('Missing Information');
      setMessageText('Please fill out all fields.');
      setModalVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessageTitle('Password Mismatch');
      setMessageText('Password and confirm password do not match.');
      setModalVisible(true);
      return;
    }

    setMessageTitle('Sign-up Details');
    setMessageText(`Username: ${username}\nEmail: ${email}\nPassword: ${password}`);
    setModalVisible(true);
  };

  const styles = Platform.OS === 'web' ? webStyles : androidStyles;

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
      {/* Background shapes - Adjusted for new bottom card layout */}
      <View style={styles.shape1} />
      <View style={styles.shape2} />
      <View style={styles.shape3} />


      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card moved to the bottom */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign Up</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} placeholder="Your Username" value={username} onChangeText={setUsername} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Your Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="********" value={password} onChangeText={setPassword} secureTextEntry />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput style={styles.input} placeholder="********" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.signUpText}>
            Already have an account?{' '}
            <Text style={styles.signUpLink} onPress={() => navigation.navigate('Login')}>
              Log In
            </Text>
          </Text>
        </View>
      </ScrollView>

      {/* Modal Message Box */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.backdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{messageTitle}</Text>
            <Text style={styles.modalText}>{messageText}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const androidStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'right', 
    justifyContent: 'flex-start',
    position: 'relative',
    padding: 0

  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 180,
    paddingBottom: 20,
  },
  shape1: { 
    position: 'absolute', 
    width: 250, 
    height: 250, 
    borderRadius: 125, 
    backgroundColor: 'rgba(255,255,255,0.22)', 
    top: -100, 
    left: -100 
  },
  shape2: { 
    position: 'absolute', 
    width: 350, 
    height: 350, 
    borderRadius: 175, 
    backgroundColor: 'rgba(255,255,255,0.47)', 
    bottom: -150, 
    right: -150 
  },
  shape3: { 
    position: 'absolute', 
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    backgroundColor: 'rgba(255,255,255,0.56)', 
    top: 50, 
    right: -50 
  
  },
  card: { 
    width: '100%',
    maxWidth: 400, 
    backgroundColor: '#ffffffff', 
    borderRadius: 20, 
    padding: 30,
    elevation: 5, 
    zIndex: 2, 
    marginVertical: -40,
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    textAlign: 'center', 
    marginBottom: 20,
    color: '#111' 
  },
  inputGroup: { 
    marginBottom: 20,
  
  },
  passwordLabelRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 5 
  },
  label: { 
    fontSize: 13, 
    fontWeight: '500', 
    marginHorizontal: -7,
    marginBottom: 7, 
    color: '#333' 
  },
  forgotPassword: { 
    fontSize: 12, 
    color: '#007BFF', 
    fontWeight: '500' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    paddingVertical: 10,
    marginHorizontal: -7,
    borderRadius: 8,
    fontSize: 12,
    backgroundColor: '#ffffffff' 
  },
  loginButton: { 
    backgroundColor: '#007BFF', 
    paddingVertical: 15, 
    borderRadius: 12, 
    marginTop: 10 
  },
  loginButtonText: { 
    color: '#fff', 
    fontSize: 16,
    fontWeight: '600', 
    textAlign: 'center' 
  },
  signUpText: { 
    textAlign: 'center', 
    fontSize: 12,
    color: '#444', 
    marginTop: 20 
  },
  signUpLink: { 
    fontWeight: '700', 
    color: '#007BFF' 
  },
  backdrop: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalBox: { 
    width: Dimensions.get('window').width * 0.9,
    maxWidth: 400,
    marginVertical: 20,
    backgroundColor: '#fafafaff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: { 
    fontSize: 18,
    fontWeight: '700', 
    marginBottom: 10, 
    color: '#111' 
  },
  modalText: { 
    fontSize: 14,
    color: '#555', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  modalButton: { 
    backgroundColor: '#007BFF', 
    paddingVertical: 10, 
    borderRadius: 8, 
    width: '100%' 
  },
  modalButtonText: { 
    color: '#fff', 
    fontWeight: '600', 
    textAlign: 'center', 
    fontSize: 14
  },
});

//-------------------------------Webstyle--------------------------------//

const webStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'flex-start',
    position: 'relative',
    padding: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 180,
    paddingBottom: 40,
  },
  shape1: { 
    position: 'absolute', 
    width: 250, 
    height: 250, 
    borderRadius: 125, 
    backgroundColor: 'rgba(255,255,255,0.22)', 
    top: -100, 
    left: -100 
  },
  shape2: { 
    position: 'absolute', 
    width: 350, 
    height: 350, 
    borderRadius: 175, 
    backgroundColor: 'rgba(255,255,255,0.47)', 
    bottom: -150, 
    right: -150 
  },
  shape3: { 
    position: 'absolute', 
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    backgroundColor: 'rgba(255,255,255,0.56)', 
    top: 50, 
    right: -50 
  

  },
  card: { 
    width: '100%',
    maxWidth: 400, 
    backgroundColor: '#ffffff', 
    borderRadius: 20, 
    padding: 70,
    elevation: 5, 
    zIndex: 2, 
    marginVertical: -50,
    boxShadow: '0px 4px 15px rgba(0,0,0,0.2)'
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    textAlign: 'center', 
    marginBottom: 30,
    color: '#111' 
  },
  inputGroup: { 
    marginBottom: 20,
  },
  passwordLabelRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 5 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '500', 
    marginBottom: 7, 
    marginHorizontal: -25,
    color: '#333' 
  },
  forgotPassword: { 
    fontSize: 15, 
    color: '#007BFF', 
    fontWeight: '500' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    paddingVertical: 14,
    marginHorizontal: -25,
    borderRadius: 8,
    fontSize: 13,
    backgroundColor: '#ffffffff' 
  },
  loginButton: { 
    backgroundColor: '#007BFF', 
    paddingVertical: 15, 
    borderRadius: 12, 
    marginTop: 10 
  },
  loginButtonText: { 
    color: '#fff', 
    fontSize: 18,
    fontWeight: '600', 
    textAlign: 'center' 
  },
  signUpText: { 
    textAlign: 'center', 
    fontSize: 14,
    color: '#444', 
    marginTop: 20 
  },
  signUpLink: { 
    fontWeight: '700', 
    color: '#007BFF' 
  },
  backdrop: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalBox: { 
    width: Dimensions.get('window').width * 0.8,
    maxWidth: 400,
    marginVertical: 20,
    backgroundColor: '#ffffffff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    boxShadow: '0px 4px 15px rgba(0,0,0,0.2)'
  },
  modalTitle: { 
    fontSize: 20,
    fontWeight: '700', 
    marginBottom: 10, 
    color: '#111' 
  },
  modalText: { 
    fontSize: 16,
    color: '#555', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  modalButton: { 
    backgroundColor: '#007BFF', 
    paddingVertical: 10, 
    borderRadius: 8, 
    width: '100%' 
  },
  modalButtonText: { 
    color: '#fff', 
    fontWeight: '600', 
    textAlign: 'center', 
    fontSize: 16
  },
});
