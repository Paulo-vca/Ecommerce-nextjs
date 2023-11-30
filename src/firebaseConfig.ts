// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN9e_AbIVQ0Q9y4bdG9tkL8YCTewMr5zo",
  authDomain: "ecommerce-nextjs-dc36b.firebaseapp.com",
  projectId: "ecommerce-nextjs-dc36b",
  storageBucket: "ecommerce-nextjs-dc36b.appspot.com",
  messagingSenderId: "1069389332007",
  appId: "1:1069389332007:web:81c09bcaf3587e101f5802",
  measurementId: "G-ED14QQHKE3"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);