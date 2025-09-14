// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsMoWt6iQdifsbORNjCCrUT00gmhj5uKE",
  authDomain: "project-70db2.firebaseapp.com",
  projectId: "project-70db2",
  storageBucket: "project-70db2.firebasestorage.app",
  messagingSenderId: "571705755876",
  appId: "1:571705755876:web:d40b774b42478ea97984f1",
  measurementId: "G-TX1JHDE30K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google user:", result.user);
    return result.user;
  } catch (err) {
    console.error(err);
  }
};