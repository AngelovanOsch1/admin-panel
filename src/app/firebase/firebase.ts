import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAYffvUNsu0hA40k3eP2O0zdNCnvrQGym8',
  authDomain: 'angulargamewebsite.firebaseapp.com',
  projectId: 'angulargamewebsite',
  storageBucket: 'angulargamewebsite.appspot.com',
  messagingSenderId: '1079738413297',
  appId: '1:1079738413297:web:8f037f13d2e8195a233950',
  measurementId: 'G-KDZ5D9J89E',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
