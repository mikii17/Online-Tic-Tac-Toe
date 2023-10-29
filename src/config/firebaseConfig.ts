// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA70NRE04JpqY1Bc7QuwXnJ2XmlaxO5bH4",
//   authDomain: "online-tic-tac-toe-67fc2.firebaseapp.com",
//   projectId: "online-tic-tac-toe-67fc2",
//   storageBucket: "online-tic-tac-toe-67fc2.appspot.com",
//   messagingSenderId: "274898805202",
//   appId: "1:274898805202:web:57ea3c6a46d8cc3f0d280b",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCUVKeOYiunB4J4U7UaE2EqHJ3M0cKnWNo",
  authDomain: "online-tic-tac-toe-19f15.firebaseapp.com",
  projectId: "online-tic-tac-toe-19f15",
  storageBucket: "online-tic-tac-toe-19f15.appspot.com",
  messagingSenderId: "640569492997",
  appId: "1:640569492997:web:cef28fec7599dd80df7e6c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;