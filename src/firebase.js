// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyACP1aNE10OGf5-zT9EKzq1wd9y2PJDybY",
  authDomain: "whatsapp-clone-firebase-5078b.firebaseapp.com",
  projectId: "whatsapp-clone-firebase-5078b",
  storageBucket: "whatsapp-clone-firebase-5078b.appspot.com",
  messagingSenderId: "209851883233",
  appId: "1:209851883233:web:f44ac6b5a9463c531be1a0",
  measurementId: "G-H6WLJ3RMC0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
