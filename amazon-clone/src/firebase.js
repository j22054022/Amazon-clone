// Import the functions you need from the SDKs you need
// 這是firebase v9 以後才改的import路徑
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsLRCbTB_wT_SljLmiDZ2nXSDD9N3u7ik",
  authDomain: "clone-490fc.firebaseapp.com",
  projectId: "clone-490fc",
  storageBucket: "clone-490fc.appspot.com",
  messagingSenderId: "401733939877",
  appId: "1:401733939877:web:85261def4328c1905c134c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
