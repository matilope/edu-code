import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVeh3WVJFimUdVHsHZcbYInMoYgz7acsk",
  authDomain: "trabajo-practico-1-cwm.firebaseapp.com",
  projectId: "trabajo-practico-1-cwm",
  storageBucket: "trabajo-practico-1-cwm.appspot.com",
  messagingSenderId: "867221760999",
  appId: "1:867221760999:web:b6b3bddea08a27de8eeb42"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);