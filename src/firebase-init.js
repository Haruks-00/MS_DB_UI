import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  writeBatch,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  collectionGroup,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app = null;
let db = null;
let auth = null;

// Firebaseの遅延初期化
const initializeFirebase = async () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }

  if (!db) {
    db = getFirestore(app);
  }

  if (!auth) {
    auth = getAuth(app);
  }

  return { db, auth };
};

// 初期化済みの場合は既存のインスタンスを返す
const getFirebaseInstances = () => {
  if (db && auth) {
    return { db, auth };
  }
  return initializeFirebase();
};

export {
  getFirebaseInstances,
  initializeFirebase,
  collection,
  doc,
  writeBatch,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  collectionGroup,
};
