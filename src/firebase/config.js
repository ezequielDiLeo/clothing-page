// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu4fGC3ty0WLeEwPVm7jynMMRgyy3pk_o",
  authDomain: "eze-s-clothes.firebaseapp.com",
  projectId: "eze-s-clothes",
  storageBucket: "eze-s-clothes.appspot.com",
  messagingSenderId: "640072767380",
  appId: "1:640072767380:web:2a8d2c2020e02289532181"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore( app )