// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: "AIzaSyAgQar8gVXMS6shYZ9QRdeYq-3LOrcY97U",
  authDomain: "plural-cv-dev.firebaseapp.com",
  projectId: "plural-cv-dev",
  storageBucket: "plural-cv-dev.appspot.com",
  messagingSenderId: "958389378275",
  appId: "1:958389378275:web:3c5288a22c534a503039d6",
  measurementId: "G-2NS1XNZYPK"
};

const env = process.env.NODE_ENV
if (env == "production"){
 // do something
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);