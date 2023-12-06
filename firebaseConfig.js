import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAYGRz0bhgFFXnFjqIyIPKVOEoBr0XgQLI",
  authDomain: "halt-ef5f7.firebaseapp.com",
  projectId: "halt-ef5f7",
  storageBucket: "halt-ef5f7.appspot.com",
  messagingSenderId: "536177333425",
  appId: "1:536177333425:web:a7149200d6e9254a4d3e90",
  measurementId: "G-JSC84XYFRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export {auth, db}