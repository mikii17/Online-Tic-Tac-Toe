// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA70NRE04JpqY1Bc7QuwXnJ2XmlaxO5bH4",
  authDomain: "online-tic-tac-toe-67fc2.firebaseapp.com",
  projectId: "online-tic-tac-toe-67fc2",
  storageBucket: "online-tic-tac-toe-67fc2.appspot.com",
  messagingSenderId: "274898805202",
  appId: "1:274898805202:web:57ea3c6a46d8cc3f0d280b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);