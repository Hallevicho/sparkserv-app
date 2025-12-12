import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Profile({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [profile, setProfile] = useState({
    name: 'Anna Jane',
    username: 'AnnaJane',
    phone: '000-000-00',
    email: 'JaneDoe@gmail.com',
    password: '************',
  });

  const fields = [
    { key: 'username', label: 'Username', isPassword: false },
    { key: 'phone', label: 'Phone', isPassword: false },
    { key: 'email', label: 'Email', isPassword: false },
    { key: 'password', label: 'Password', isPassword: true },
  ];

  const handleChange = (key, value) => setProfile({ ...profile, [key]: value });
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogout = () => setLogoutModalVisible(true);

  const confirmLogout = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('Login');
    });
    setLogoutModalVisible(false);
  };

  // Platform-specific styles
  const styles = Platform.OS === 'web' ? stylesWeb : stylesAndroid;

  return (
    <>
      {/* Fixed Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        {isEditing && (
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => setIsEditing(false)}
          >
            <Text style={styles.arrowText}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerText}>
          {isEditing ? 'Edit Profile' : 'Account Profile'}
        </Text>
        {!isEditing ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setIsEditing(false)}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileCard}>
          <Text style={styles.name}>{profile.name}</Text>

          {fields.map((field) => (
            <View key={field.key} style={styles.field}>
              <Text style={styles.label}>{field.label}</Text>
              {isEditing ? (
                field.isPassword ? (
                  <View style={styles.passwordRow}>
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      secureTextEntry={!showPassword}
                      value={profile[field.key]}
                      onChangeText={(text) => handleChange(field.key, text)}
                    />
                    <TouchableOpacity
                      style={styles.showButton}
                      onPress={togglePasswordVisibility}
                    >
                      <Text style={styles.showText}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TextInput
                    style={styles.input}
                    value={profile[field.key]}
                    onChangeText={(text) => handleChange(field.key, text)}
                  />
                )
              ) : (
                <Text style={styles.value}>{profile[field.key]}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        {!isEditing && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Text style={styles.backText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Logout Modal */}
      <Modal transparent visible={logoutModalVisible} animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ef4444' }]}
                onPress={confirmLogout}
              >
                <Text style={styles.modalLogoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

// Android Styles
const stylesAndroid = StyleSheet.create({
  scrollContainer: { paddingTop: 110, paddingBottom: 30, alignItems: 'center', width: '100%' },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#f2f2f7',
    zIndex: 10,
    elevation: 10,
  },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#222' },
  editButton: { backgroundColor: '#007BFF', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20 },
  saveButton: { backgroundColor: '#22c55e', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  profileCard: {
    width: SCREEN_WIDTH - 40,
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
  },
  name: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#111', textAlign: 'center' },
  field: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 4 },
  value: { fontSize: 16, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#f9f9f9', fontSize: 16 },
  passwordRow: { flexDirection: 'row', alignItems: 'center' },
  showButton: { marginLeft: 10 },
  showText: { color: '#007BFF', fontWeight: '600', fontSize: 14 },
  actions: { width: '100%', alignItems: 'center', marginTop: 10 },
  logoutButton: { backgroundColor: '#ef4444', paddingVertical: 14, borderRadius: 16, width: SCREEN_WIDTH - 80, maxWidth: 350, marginBottom: 10, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  backButton: { backgroundColor: '#fff', paddingVertical: 14, borderRadius: 16, borderWidth: 1, borderColor: '#ddd', width: SCREEN_WIDTH - 80, maxWidth: 350, alignItems: 'center' },
  backText: { color: '#111', fontWeight: '600', fontSize: 16 },
  arrowButton: { marginRight: 10 },
  arrowText: { fontSize: 22, fontWeight: 'bold', color: '#111' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { width: 280, backgroundColor: '#fff', borderRadius: 15, padding: 18, alignItems: 'center', elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8, color: '#111' },
  modalText: { fontSize: 15, color: '#555', textAlign: 'center' },
  modalButtonsRow: { flexDirection: 'row', marginTop: 18, justifyContent: 'space-between', width: '100%' },
  modalButton: { flex: 1, paddingVertical: 12, borderRadius: 12, marginHorizontal: 5 },
  modalCancelText: { color: '#333', fontWeight: '600', textAlign: 'center' },
  modalLogoutText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
});

// Web Styles
const stylesWeb = StyleSheet.create({
  scrollContainer: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  header: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#f2f2f7',
    boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
  headerText: { fontSize: 28, fontWeight: 'bold', color: '#222' },

  // Arrow styles
  arrowButton: {
    position: 'absolute',
    left: 20,            // distance from left corner
    top: '50%',           // vertically center with header
    transform: [{ translateY: -12 }], // adjust vertical alignment
    cursor: 'pointer',   // for web hover
    zIndex: 11,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111',
  },

  profileCard: {
    width: 480,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    marginBottom: 20,
  },
  name: { fontSize: 28, fontWeight: 'bold', marginBottom: 25, color: '#111', textAlign: 'center' },
  field: { width: '100%', marginBottom: 18 },
  label: { fontSize: 15, fontWeight: '600', color: '#555', marginBottom: 6 },
  value: { fontSize: 16, color: '#333' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#f9f9f9', fontSize: 16 },
  passwordRow: { flexDirection: 'row', alignItems: 'center' },
  showButton: { marginLeft: 10 },
  showText: { color: '#007BFF', fontWeight: '600', fontSize: 14 },
  editButton: { position: 'absolute', top: 20, right: 20, backgroundColor: '#007BFF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  saveButton: { position: 'absolute', top: 20, right: 20, backgroundColor: '#22c55e', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  // Buttons stacked vertically below card
  actions: { width: 480, marginTop: 20, alignItems: 'center' },
  logoutButton: { 
    backgroundColor: '#ef4444', 
    width: '100%',
    maxWidth: 400,
    paddingVertical: 14, 
    borderRadius: 16, 
    marginBottom: 12, 
    alignItems: 'center' 
  },
  logoutText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 16, 
    textAlign: 'center' 
  },
  backButton: { 
    backgroundColor: '#fff', 
    width: '100%',
    maxWidth: 400,
    paddingVertical: 14, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    alignItems: 'center' 
  },
  backText: { 
    color: '#111', 
    fontWeight: '700', 
    fontSize: 16, 
    textAlign: 'center' 
  },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { width: 350, backgroundColor: '#fff', borderRadius: 18, padding: 24, alignItems: 'center', elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10, color: '#111' },
  modalText: { fontSize: 16, color: '#555', textAlign: 'center' },
  modalButtonsRow: { flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: '100%' },
  modalButton: { flex: 1, paddingVertical: 12, borderRadius: 14, marginHorizontal: 5 },
  modalCancelText: { color: '#333', fontWeight: '600', textAlign: 'center' },
  modalLogoutText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
});