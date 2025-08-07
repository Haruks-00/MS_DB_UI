import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyArnrHZPft_F6a-5sNUxQNViFddzshIlEo",
  authDomain: "msdatabase-e2d25.firebaseapp.com",
  projectId: "msdatabase-e2d25",
  storageBucket: "msdatabase-e2d25.firebasestorage.app ",
  messagingSenderId: "525846107898",
  appId: "1:525846107898:web:41a6740fa50a0e84b91b43",
  measurementId: "G-0VV0VG0LT6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };