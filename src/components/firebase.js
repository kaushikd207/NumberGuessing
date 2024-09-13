// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOErIuBe5SqgztK0FT3Cjp7YAavxwOl_A",
    authDomain: "game-781df.firebaseapp.com",
    projectId: "game-781df",
    storageBucket: "game-781df.appspot.com", 
    messagingSenderId: "703402552752",
    appId: "1:703402552752:web:17cfb74ce0edd6224afa75",
    measurementId: "G-0X7BFL4Q6B"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
