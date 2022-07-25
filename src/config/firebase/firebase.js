// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj4_Jte5uLvkN63NxSFFNmUTcRDAuhtqc",
  authDomain: "pharmacy-pwdk.firebaseapp.com",
  projectId: "pharmacy-pwdk",
  storageBucket: "pharmacy-pwdk.appspot.com",
  messagingSenderId: "620056565106",
  appId: "1:620056565106:web:621617a130457dae21b9eb",
  measurementId: "G-87X0W4263Y",
};

// Initialize Firebase
// eslint-disable-next-line import/no-mutable-exports
let analytics;
// eslint-disable-next-line import/no-mutable-exports
let auth;
if (firebaseConfig?.projectId) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== "undefined") {
    analytics = getAnalytics(app);
    auth = getAuth(app);
  }
}

export { analytics, auth };
