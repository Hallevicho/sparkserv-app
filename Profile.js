import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Modal,
} from 'react-native';

export default function Profile({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Anna Jane',
    username: 'AnnaJane',
    phone: '000-000-00',
    email: 'JaneDoe@gmail.com',
    password: '************',
  });

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => setIsEditing(false);
  const handleChange = (field, value) => setProfile({ ...profile, [field]: value });
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Open the confirmation modal
  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  // Confirm logout with fade-out animation
  const confirmLogout = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('Login');
    });
    setLogoutModalVisible(false);
  };

  return (
    <>
      <Animated.ScrollView style={{ flex: 1, opacity: fadeAnim }} contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Account Profile</Text>
          {!isEditing ? (
            <TouchableOpacity style={styles.editButton} onPress={handleEditClick}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveClick}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Text style={styles.name}>{profile.name}</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Username</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.username}
                onChangeText={(text) => handleChange('username', text)}
              />
            ) : (
              <Text style={styles.value}>{profile.username}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Phone</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.phone}
                onChangeText={(text) => handleChange('phone', text)}
              />
            ) : (
              <Text style={styles.value}>{profile.phone}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(text) => handleChange('email', text)}
              />
            ) : (
              <Text style={styles.value}>{profile.email}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            {isEditing ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  secureTextEntry={!showPassword}
                  value={profile.password}
                  onChangeText={(text) => handleChange('password', text)}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.showButton}>
                  <Text style={styles.showText}>{showPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.value}>{profile.password}</Text>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.backText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal transparent visible={logoutModalVisible} animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: '100%' }}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={{ color: '#333', fontWeight: '600', textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ef4444' }]}
                onPress={confirmLogout}
              >
                <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f2f2f7', flexGrow: 1, alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 30, alignItems: 'center', marginBottom: 20 },
  headerText: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  editButton: { backgroundColor: '#007BFF', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 25 },
  saveButton: { backgroundColor: '#22c55e', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 25 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  profileCard: { width: '100%', backgroundColor: '#fff', borderRadius: 25, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 6, marginBottom: 30 },
  name: { fontSize: 30, fontWeight: 'bold', marginBottom: 25, color: '#111' },
  field: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6 },
  value: { fontSize: 16, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 15, paddingVertical: 12, paddingHorizontal: 15, backgroundColor: '#f9f9f9', fontSize: 16 },
  showButton: { marginLeft: 12 },
  showText: { color: '#007BFF', fontWeight: '600', fontSize: 14 },
  actions: { width: '100%' },
  logoutButton: { backgroundColor: '#ef4444', paddingVertical: 16, borderRadius: 20, marginBottom: 12, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  backButton: { backgroundColor: '#fff', paddingVertical: 16, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  backText: { color: '#111', fontWeight: '600', fontSize: 16 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { width: 300, backgroundColor: '#fff', borderRadius: 15, padding: 20, alignItems: 'center', elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10, color: '#111' },
  modalText: { fontSize: 16, color: '#555', textAlign: 'center' },
  modalButton: { flex: 1, paddingVertical: 12, borderRadius: 8, marginHorizontal: 5 },
});
