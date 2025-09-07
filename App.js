import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import Login from './Login';
import SignIn from './SignIn';

import FixerImage from './assets/Fixer.png';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={['#00f2fe', '#4facfe']}
      style={[Platform.OS === 'web' ? styles.webContainer : styles.androidContainer]}
    >
      <View style={styles.shape1} />
      <View style={styles.shape2} />
      <View style={styles.shape3} />

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {Platform.OS === 'web' ? (
          <View style={styles.webInnerContainer}>
            <Image source={FixerImage} style={styles.webImage} />
            <View style={styles.webTextContainer}>
              <Text style={styles.webTitle}>SPARKSERV</Text>
              <Text style={styles.webSubtitle}>We Listen, We Fix!</Text>
              <TouchableOpacity style={styles.webButton} onPress={handleGetStarted}>
                <Text style={styles.webButtonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.androidTitle}>SPARKSERV</Text>
            <Text style={styles.androidSubtitle}>We Listen, We Fix!</Text>
            <Image
              source={FixerImage}
              style={styles.androidImage}
              onError={() => console.warn('Image failed to load on Android')}
            />
            <TouchableOpacity style={styles.androidButton} onPress={handleGetStarted}>
              <Text style={styles.androidButtonText}>Get Started</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </LinearGradient>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  // Android styles
  androidContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  androidTitle: { fontSize: 36, fontWeight: 'bold', marginBottom: 0, textAlign: 'center', color: '#fff' },
  androidSubtitle: { fontSize: 20, marginBottom: 20, textAlign: 'center', color: '#fff' },
  androidImage: { width: 400, height: 370, resizeMode: 'contain', marginBottom: 40 },
  androidButton: { backgroundColor: '#007BFF', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 10, marginTop: 40 },
  androidButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  // Web styles
  webContainer: { flex: 1, width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: 200 },
  webInnerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', maxWidth: 1200, width: '90%', gap: 60 },
  webImage: { width: 600, height: 600, resizeMode: 'contain', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 10 },
  webTextContainer: { flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' },
  webTitle: { fontSize: 50, fontWeight: 'bold', marginBottom: 0, color: '#fff' },
  webSubtitle: { fontSize: 26, marginBottom: 40, color: '#fff' },
  webButton: { backgroundColor: '#007BFF', paddingVertical: 18, paddingHorizontal: 40, borderRadius: 12 },
  webButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },

  // Background Shapes
  shape1: { position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255, 255, 255, 0.38)' },
  shape2: { position: 'absolute', bottom: -60, right: -60, width: 250, height: 250, borderRadius: 125, backgroundColor: 'rgba(255, 255, 255, 0.22)' },
  shape3: { position: 'absolute', top: '40%', left: '20%', width: 150, height: 150, borderRadius: 75, backgroundColor: 'rgba(255, 255, 255, 0.19)' },
});
