// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeXB1sHEx-LTHyPovvwWF3xICYgncti3k",
  authDomain: "dust-ec112.firebaseapp.com",
  projectId: "dust-ec112",
  storageBucket: "dust-ec112.appspot.com",
  messagingSenderId: "878614089043",
  appId: "1:878614089043:web:7a3e60efb5b9616422e5a6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
