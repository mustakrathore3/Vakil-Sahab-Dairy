// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDr6dV5_I20NQK1UU-EVazfyW-KlM5oBI",
  authDomain: "vakilsahabdairy.firebaseapp.com",
  projectId: "vakilsahabdairy",
  storageBucket: "vakilsahabdairy.firebasestorage.app",
  messagingSenderId: "8534746153",
  appId: "1:8534746153:web:4973290db36d4f21e52838"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, doc, setDoc, getDoc, collection, addDoc, query, where, getDocs };