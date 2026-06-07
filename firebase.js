import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// 🔥 YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBoQlykPV5JYQPLj96D2yLpFJ0pWdtSLiU",
  authDomain: "quest-app-1629b.firebaseapp.com",
  projectId: "quest-app-1629b",
  storageBucket: "quest-app-1629b.firebasestorage.app",
  messagingSenderId: "894667411474",
  appId: "1:894667411474:web:8131e7b92326a3d35688cb"
};

// 🚀 INIT FIREBASE
const app = initializeApp(firebaseConfig);

// 🔐 SERVICES
export const auth = getAuth(app);
export const db = getFirestore(app);
