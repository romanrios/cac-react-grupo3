// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMKbluD8VBWERgXm2VCglrC9Gn4SefIX8",
  authDomain: "codoacodo-react.firebaseapp.com",
  projectId: "codoacodo-react",
  storageBucket: "codoacodo-react.appspot.com",
  messagingSenderId: "889487536947",
  appId: "1:889487536947:web:e64c5909f3f23a92428446",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
