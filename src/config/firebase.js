import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Set up Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDT9vCMo27-eorY7YfKUxrJm42DnUwfbiU",
  authDomain: "koinbittrust-7ba0a.firebaseapp.com",
  projectId: "koinbittrust-7ba0a",
  storageBucket: "koinbittrust-7ba0a.appspot.com",
  messagingSenderId: "208759701810",
  appId: "1:208759701810:web:fbbe940a301376606dd72b"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

const storage = getStorage(app);

// Listen only for logged in state

export {
  app,
  auth,
  db,
  storage,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
};
