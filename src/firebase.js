import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVSgMmGgd2CVPHLLPebpnc9C7SaCDcmi4",
  authDomain: "myyelp-5a671.firebaseapp.com",
  projectId: "myyelp-5a671",
  storageBucket: "myyelp-5a671.appspot.com",
  messagingSenderId: "36680076146",
  appId: "1:36680076146:web:8826da2bd030b7c4c06beb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {app, auth, db};