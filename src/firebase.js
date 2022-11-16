import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-Ysu8AlhAEa_WHINVk6ComfYE1-xoZa8",
  authDomain: "appp-40e7e.firebaseapp.com",
  projectId: "appp-40e7e",
  storageBucket: "appp-40e7e.appspot.com",
  messagingSenderId: "132127563232",
  appId: "1:132127563232:web:16da3be2bc01fe885f1f85"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };