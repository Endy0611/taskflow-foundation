// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdztR7JkDTL1W3iOSbsBYJGD_Qd6XSI4o",
  authDomain: "task-flow-5e98b.firebaseapp.com",
  projectId: "task-flow-5e98b",
  storageBucket: "task-flow-5e98b.appspot.com", // fixed typo here
  messagingSenderId: "448612432940",
  appId: "1:448612432940:web:e0ff18024bd0d9add72589",
  measurementId: "G-1JJY8S8N72"
};
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);