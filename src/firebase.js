// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getStorage } from 'firebase/storage';
import {getAuth} from 'firebase/auth'
import {getDatabase} from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWDujgTywMYAFrRKV4sSOKC-Pnl4rDA3A",
  authDomain: "location-tr-f72c5.firebaseapp.com",
  databaseURL: "https://location-tr-f72c5-default-rtdb.firebaseio.com",
  projectId: "location-tr-f72c5",
  storageBucket: "location-tr-f72c5.appspot.com",
  messagingSenderId: "562570383094",
  appId: "1:562570383094:web:318f6c63caf6a2e25da6d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize storage using getStorage function
const auth = getAuth(app)
const database = getDatabase(app);
export { database,auth,storage,app as default}; // Export both app and storage
