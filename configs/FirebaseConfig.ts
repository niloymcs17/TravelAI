// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBafcpF03AVrZEswUislc1DYER3KcRs7yM",
  authDomain: "reactnative-2d72d.firebaseapp.com",
  projectId: "reactnative-2d72d",
  storageBucket: "reactnative-2d72d.appspot.com",
  messagingSenderId: "844435918849",
  appId: "1:844435918849:web:d834a8cd223be7611e3000",
  measurementId: "G-BC0GEVTPSR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);