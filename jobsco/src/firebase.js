// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYbzz7f9CUb92em4_OiDSigqm57pyWvAQ",
  authDomain: "jobsco-05.firebaseapp.com",
  projectId: "jobsco-05",
  storageBucket: "jobsco-05.appspot.com",
  messagingSenderId: "207316569741",
  appId: "1:207316569741:web:095cb39bbd84212ae01cc4",
  measurementId: "G-E7268QDZKP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);