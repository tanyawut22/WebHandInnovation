
import { initializeApp} from "firebase/app";
import { getDatabase} from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import firebase from 'firebase/app';

export const firebaseConfig = {
  apiKey: "AIzaSyD5weTu3aIXnsQgFx6dmCcSjRP4f6dL_lY",
  authDomain: "innovation-hand.firebaseapp.com",
  databaseURL: "https://innovation-hand-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "innovation-hand",
  storageBucket: "innovation-hand.appspot.com",
  messagingSenderId: "901859590127",
  appId: "1:901859590127:web:1948cf7249dd6a00ca001a",
  measurementId: "G-5ERZNJG7E9"
}
const app = initializeApp(firebaseConfig);

const db = getDatabase(app)
// const dbFire = getFirestore(app);
const auth = getAuth(app);
const firestoredb = getFirestore(app);


export {
    db,
    firestoredb,
    // dbFire,
    auth,

}
