import firebase from "firebase/app";


import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyAZn-eJufwaMfPkJpRcUI1NEZO1Qbzi_B4",
  authDomain: "order-track-2ed24.firebaseapp.com",
  databaseURL: "https://order-track-2ed24-default-rtdb.firebaseio.com",
  projectId: "order-track-2ed24",
  storageBucket: "order-track-2ed24.appspot.com",
  messagingSenderId: "177748184152",
  appId: "1:177748184152:web:2d046d1b76dfc2a37c0e2d",
  measurementId: "G-FMFK44RYNY"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()


export {firebaseAuth, firebaseDb}