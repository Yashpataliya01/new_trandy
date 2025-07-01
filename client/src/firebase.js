// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCi5wqYx8usdVJEGk0n0F8-5QRqFtxtwSs",
  authDomain: "trandingpage-fe493.firebaseapp.com",
  projectId: "trandingpage-fe493",
  storageBucket: "trandingpage-fe493.firebasestorage.app",
  messagingSenderId: "632595706601",
  appId: "1:632595706601:web:b3bb632215855f252d7678",
  measurementId: "G-ZF0MEK42D5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
