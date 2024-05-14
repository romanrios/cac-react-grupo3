// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm8bKUQOm50ux6q62iCQhBF43y95fIVGc",
  authDomain: "tareascodoacodo.firebaseapp.com",
  projectId: "tareascodoacodo",
  storageBucket: "tareascodoacodo.appspot.com",
  messagingSenderId: "333024942565",
  appId: "1:333024942565:web:5c05df0f1b9bae4b94370c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//conectarse a Firestore
export const db = getFirestore(app);
