// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBE5JofpjH2hVqq-kFjeruqtZmXmnP-LDs",
  authDomain: "todoist-clone-3d3ab.firebaseapp.com",
  projectId: "todoist-clone-3d3ab",
  storageBucket: "todoist-clone-3d3ab.appspot.com",
  messagingSenderId: "397415277423",
  appId: "1:397415277423:web:3bf39bc1ff8180d3e5be9a",
  measurementId: "G-4M77KKRNBQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
