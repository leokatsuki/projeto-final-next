import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-next-408800.firebaseapp.com",
  projectId: "blog-next-408800",
  storageBucket: "blog-next-408800.appspot.com",
  messagingSenderId: "988358874137",
  appId: "1:988358874137:web:a57c366a080a6148c84688",
  measurementId: "G-528WVH2TC2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);