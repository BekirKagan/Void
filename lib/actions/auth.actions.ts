"use server"

import { firebaseApp, firebaseDB } from "@/lib/firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { doc, setDoc, getDoc, DocumentSnapshot } from "firebase/firestore"

const USERS_COLLECTION = "users"

export interface ServerActionResponse {
  success: boolean,
  message?: string,
  value?: any
}

export async function createUser(username: string, email: string, password: string): Promise<string> {
  try {
    const auth = getAuth(firebaseApp)
    const credential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(firebaseDB, USERS_COLLECTION, credential.user.uid), {
      id: credential.user.uid,
      username: username,
      email: email,
    })
    return JSON.stringify({
      success: true,
      message: "Account created successfully!",
      value: credential
    })
  } catch (error: any) {
    console.error(error.message)
    return JSON.stringify({
      success: false,
      message: error.code,
    })
  }
}

export async function authenticateUser(email: string, password: string): Promise<string> {
  try {
    const auth = getAuth(firebaseApp)
    const credential: UserCredential = await signInWithEmailAndPassword(auth, email, password)
    const snapshot: DocumentSnapshot = await getDoc(doc(firebaseDB, USERS_COLLECTION, credential.user.uid))
    console.log(snapshot.data())
    if (snapshot.exists()) {
      return JSON.stringify({
        success: true,
        message: "Signed in successfully!",
        value: credential
      })
    } else {
      return JSON.stringify({
        success: false,
        message: "User does not exists."
      })
    }
  } catch (error: any) {
    console.error(error.message)
    return JSON.stringify({
      success: false,
      message: error.code
    })
  }
}

