import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJZ98F2qoCmDSF5M5XugUQbSCooHgnDmI",
    authDomain: "noteflow-ca51f.firebaseapp.com",
    projectId: "noteflow-ca51f",
    storageBucket: "noteflow-ca51f.firebasestorage.app",
    messagingSenderId: "758086395153",
    appId: "1:758086395153:web:d23d601ede181b606018b0"
  };

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

