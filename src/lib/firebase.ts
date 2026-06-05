import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWVPpUxhruYmuH4Vsi-22ppJ603x7iU48",
  authDomain: "controle-financeiro-pess-45a60.firebaseapp.com",
  projectId: "controle-financeiro-pess-45a60",
  storageBucket: "controle-financeiro-pess-45a60.firebasestorage.app",
  messagingSenderId: "633034170054",
  appId: "1:633034170054:web:30b321ed12f236b69801c7"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
