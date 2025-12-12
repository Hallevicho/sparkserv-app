// firebase/firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQZmGIS3EBHWH7dzHn-avf-nxEyAd_T2k",
  authDomain: "sparkserv-52280.firebaseapp.com",
  projectId: "sparkserv-52280",
  storageBucket: "sparkserv-52280.appspot.com",
  messagingSenderId: "716903944376",
  appId: "1:716903944376:web:22f63af262b32724e7244d",
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firebase Authentication instance
export const auth = getAuth(app);
