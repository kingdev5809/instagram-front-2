import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQAjKUTmoHbaUYnV5WArWToIciukkljp0",
  authDomain: "instagram-clone-by-me.firebaseapp.com",
  projectId: "instagram-clone-by-me",
  storageBucket: "instagram-clone-by-me.appspot.com",
  messagingSenderId: "216017895418",
  appId: "1:216017895418:web:c0d274d90a5855678dee43",
  measurementId: "G-TWVQ54V28D",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
