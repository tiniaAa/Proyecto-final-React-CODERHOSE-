import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCDqBQoun8QZwHrHsDSnBPpBdH1d9yh69o",
  authDomain: "amma-39235.firebaseapp.com",
  projectId: "amma-39235",
  storageBucket: "amma-39235.firebasestorage.app",
  messagingSenderId: "698177112521",
  appId: "1:698177112521:web:0abcdfe21b347966ac4018",
  measurementId: "G-P6CDMRBSCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const dataBase = getFirestore(app);