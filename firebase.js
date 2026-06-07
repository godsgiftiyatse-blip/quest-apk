import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBoQlykPV5JYQPLj96D2yLpFJ0pWdtSLiU",
  authDomain: "quest-app-1629b.firebaseapp.com",
  projectId: "quest-app-1629b",
  storageBucket: "quest-app-1629b.firebasestorage.app",
  messagingSenderId: "894667411474",
  appId: "1:894667411474:web:8131e7b92326a3d35688cb",
  measurementId: "G-QLG23KHB62"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

getAnalytics(app);
