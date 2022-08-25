// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyDLBTg8R7kqHb3XdorP3bgxM7NyLaLe4Yk",
  authDomain: "hotel-booking-9b0b2.firebaseapp.com",
  projectId: "hotel-booking-9b0b2",
  storageBucket: "hotel-booking-9b0b2.appspot.com",
  messagingSenderId: "459815060485",
  appId: "1:459815060485:web:25e2f94f78afcbcc1e086c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const firebaseDB = getFirestore(app);