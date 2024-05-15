// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // MAR
  // apiKey: "AIzaSyCm8bKUQOm50ux6q62iCQhBF43y95fIVGc",
  // authDomain: "tareascodoacodo.firebaseapp.com",
  // projectId: "tareascodoacodo",
  // storageBucket: "tareascodoacodo.appspot.com",
  // messagingSenderId: "333024942565",
  // appId: "1:333024942565:web:5c05df0f1b9bae4b94370c",

  // ROMAN
  apiKey: "AIzaSyCMKbluD8VBWERgXm2VCglrC9Gn4SefIX8",
  authDomain: "codoacodo-react.firebaseapp.com",
  projectId: "codoacodo-react",
  storageBucket: "codoacodo-react.appspot.com",
  messagingSenderId: "889487536947",
  appId: "1:889487536947:web:e64c5909f3f23a92428446",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//conectarse a Firestore
export const db = getFirestore(app);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()