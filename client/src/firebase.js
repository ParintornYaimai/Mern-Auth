// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey:'AIzaSyAF11Lex-IvzdS-cZeTXlHGdCKlIwRuBsc',
  authDomain: "mern-auth-4acd8.firebaseapp.com",
  projectId: "mern-auth-4acd8",
  storageBucket: "mern-auth-4acd8.appspot.com",
  messagingSenderId: "356272454424",
  appId: "1:356272454424:web:dad68c2be98bd0a7203c6d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);