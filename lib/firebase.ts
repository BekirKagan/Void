import "dotenv/config"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const API_KEY = process.env.FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "void-50ef4.firebaseapp.com",
  projectId: "void-50ef4",
  storageBucket: "void-50ef4.appspot.com",
  messagingSenderId: "781848541289",
  appId: "1:781848541289:web:634f06cc0c46abd4a50af8"
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseDB = getFirestore(firebaseApp)

