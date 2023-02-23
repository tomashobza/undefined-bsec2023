// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "undefined-f8fbc.firebaseapp.com",
  projectId: "undefined-f8fbc",
  storageBucket: "undefined-f8fbc.appspot.com",
  messagingSenderId: "908496212597",
  appId: "1:908496212597:web:2ee0f88b02c568df439e3c",
  measurementId: "G-64XPRE1B2K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);