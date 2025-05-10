import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDUdy8tzvc7FsqFf0rdknG13URk9v-hVWs",
    authDomain: "minidevblogvictortesti.firebaseapp.com",
    projectId: "minidevblogvictortesti",
    storageBucket: "minidevblogvictortesti.firebasestorage.app",
    messagingSenderId: "774102965381",
    appId: "1:774102965381:web:d219bf362ac74472dc5dec",
    measurementId: "G-W27L422987"
  };

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { db, auth, googleProvider }