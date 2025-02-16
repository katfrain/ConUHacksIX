import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMDuRGL35iw1acltr1Tlu9TqaR7MomXtQ",
    authDomain: "conutrades.firebaseapp.com",
    projectId: "conutrades",
    storageBucket: "conutrades.firebasestorage.app",
    messagingSenderId: "449287596245",
    appId: "1:449287596245:web:23546ba185c7b5c6c41a5c"
};

// Initialize Firebase
export const FIREBASE_APP= initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);
