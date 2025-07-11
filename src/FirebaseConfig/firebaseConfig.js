import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCsn-9kqNDAr9ZM4NnHN27RdBt3hQGvqnc",
  authDomain: "e-commerce-57428.firebaseapp.com",
  projectId: "e-commerce-57428",
  storageBucket: "e-commerce-57428.firebasestorage.app",
  messagingSenderId: "589449578781",
  appId: "1:589449578781:web:e0c079302528483df079f4",
  measurementId: "G-69QX143YRQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth}