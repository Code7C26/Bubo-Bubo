// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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