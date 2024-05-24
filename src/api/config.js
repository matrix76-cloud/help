import firebase from "firebase/compat/app";

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


export const firebaseConfig = {
    apiKey: "AIzaSyDd0-jR1N2y8UWz3xTlyqgbDMYxRpW3N2U",
    authDomain: "marone-d7e06.firebaseapp.com",
    projectId: "marone-d7e06",
    storageBucket: "marone-d7e06.appspot.com",
    messagingSenderId: "1094223074082",
    appId: "1:1094223074082:web:a5748c9a7cc43330d58b7b",
    measurementId: "G-6C6DZMQ0J8"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ experimentalForceLongPolling: true });
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, firebaseApp };