"use server"

import { firebaseApp, firebaseDB } from "@/lib/firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, Auth, UserCredential } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"

const USERS_COLLECTION = "users"

export type UserData = {
  id: string,
  username: string,
  email: string
}

export async function createUser(username: string, email: string, password: string): Promise<UserData | null> {
  try {
    const auth: Auth = getAuth(firebaseApp)
    const credential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
    const userData: UserData = {
      id: credential.user.uid,
      username: username,
      email: credential.user.email as string
    }
    await setDoc(doc(firebaseDB, USERS_COLLECTION, credential.user.uid), userData)
    return userData
  } catch (error: any) {
    console.error("[ERROR ", error.code, "]: ", error.message)
    return null
  }
}

export async function authenticateUser(email: string, password: string): Promise<UserData | null> {
  try {
    const auth: Auth = getAuth(firebaseApp)
    const credential: UserCredential = await signInWithEmailAndPassword(auth, email, password)
    const snapshot = await getDoc(doc(firebaseDB, USERS_COLLECTION, credential.user.uid))
    if (snapshot.exists()) {
      const userData: UserData = snapshot.data() as UserData
      return userData
    } else {
      return null
    }
  } catch (error: any) {
    console.error("[ERROR ", error.code, "]: ", error.message)
    return null
  }
}

export async function signOutUser(): Promise<void> {
  try {
    const auth: Auth = getAuth(firebaseApp)
    await signOut(auth)
  } catch (error: any) {
    console.error("[ERROR ", error.code, "]: ", error.message)
  }
}

