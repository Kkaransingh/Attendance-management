// Import necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9BOI8Xw_RbaEkK-wQS5J_k8Ib4zzZq3I",
  authDomain: "attendance-management-ba0a0.firebaseapp.com",
  projectId: "attendance-management-ba0a0",
  storageBucket: "attendance-management-ba0a0.appspot.com", // Fixed the storage bucket URL typo
  messagingSenderId: "501686858594",
  appId: "1:501686858594:web:16af1c8ff274134088f23b",
  measurementId: "G-SBHX83VFTS", // Optional for analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

// Initialize Analytics (conditionally if supported)
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  } else {
    console.warn("Firebase Analytics is not supported on this platform.");
  }
});

// Export Firebase services
export { app, auth, storage, analytics };
