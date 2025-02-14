// Import the functions you need from the SDKs you need
require('dotenv').config();
const { initializeApp }=require("firebase/app");
const {getStorage }=require("firebase/storage");



const firebaseConfig = {
  apiKey:process.env.API_KEY ,
  authDomain:process.env.AUTH_DOMAIN ,
  projectId:process.env.PROJECT_ID ,
  storageBucket:process.env.STORAGE_BUCKET ,
  messagingSenderId:process.env.MESSAGING_SENDER_ID ,
  appId: process.env.APP_ID,
  measurementId:process.env.MEASURMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
exports.storage=getStorage(app);