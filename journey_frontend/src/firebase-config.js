// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArmgE8SVG3CYdDZ_tdkQJL3oY-29zHags",
  authDomain: "journey-5ea10.firebaseapp.com",
  projectId: "journey-5ea10",
  storageBucket: "journey-5ea10.appspot.com",
  messagingSenderId: "118588368280",
  appId: "1:118588368280:web:848730ebe73396c04fb7ed",
  measurementId: "G-T3VSPM6QS2",
  databaseURL: "https://journey-5ea10-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
