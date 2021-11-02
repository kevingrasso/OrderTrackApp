import firebase from "firebase/app";


import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "****************************",
  authDomain: "*****************************",
  databaseURL: "**********************************",
  projectId: "***********************",
  storageBucket: "********************",
  messagingSenderId: "************************",
  appId: "*******************************",
  measurementId: "***************************"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()


export {firebaseAuth, firebaseDb}
