// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// NUEVO: Importa getFirestore desde el SDK de Firestore
import { getFirestore } from "firebase/firestore";
// NUEVO: Importa getAuth desde el SDK de Authentication
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvxd_-Y71RY6eylvTTz6z74SFvlpy1Tig",
  authDomain: "bubo2-bubo.firebaseapp.com",
  projectId: "bubo2-bubo",
  storageBucket: "bubo2-bubo.firebasestorage.app",
  messagingSenderId: "450596949573",
  appId: "1:450596949573:web:7bfd0b82a7f079239d1d2c",
  measurementId: "G-Y6C1GSJM8D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// BASE DE DATOS
export const db = getFirestore(app);

// AUTENTICACIÓN
export const auth = getAuth(app);