// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCR4n1LlY2Blpb7n3vq5rr7MsKRfbM5OCs",
    authDomain: "proy-tasklist.firebaseapp.com",
    projectId: "proy-tasklist",
    storageBucket: "proy-tasklist.appspot.com",
    messagingSenderId: "240326791682",
    appId: "1:240326791682:web:a2ec5263589ad381ddcd1b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore();