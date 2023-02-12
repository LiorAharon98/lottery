// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA-Tzm536uAeHz6reXv1JMr6zFPx6AbJwQ",
  authDomain: "lottery-4728e.firebaseapp.com",
  projectId: "lottery-4728e",
  storageBucket: "lottery-4728e.appspot.com",
  messagingSenderId: "600352691443",
  appId: "1:600352691443:web:1083725826029bb6f91386",
  measurementId: "G-FGXT8QXFX0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
