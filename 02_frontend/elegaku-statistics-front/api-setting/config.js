// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAJndhsQ7p1R37Er4I3mJVor7jHApsiEP8',
  authDomain: 'elegaku-unofficial.firebaseapp.com',
  projectId: 'elegaku-unofficial',
  storageBucket: 'elegaku-unofficial.appspot.com',
  messagingSenderId: '587503892825',
  appId: '1:587503892825:web:81eee98cf6b8f6f5b9b448',
  measurementId: 'G-ZD497SBJ1R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
