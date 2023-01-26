import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCqxSGqqnfFlX2DlpETVgE3KfXK5wlZSvU',
  authDomain: 'social-57ecd.firebaseapp.com',
  projectId: 'social-57ecd',
  storageBucket: 'social-57ecd.appspot.com',
  messagingSenderId: '359065217904',
  appId: '1:359065217904:web:efcd811d1688397e40bdb5',
  measurementId: 'G-9JW85Z3JYC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
