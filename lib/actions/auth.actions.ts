"use server"

import { firebaseApp, firebaseDB } from "@/lib/firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, Auth, UserCredential } from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc, DocumentReference } from "firebase/firestore"

const USERS_COLLECTION = "users"

export type UserData = {
  id: string,
  username: string,
  email: string,
  bio: string,
  photo: string
}

export async function createUser(username: string, email: string, password: string): Promise<UserData | null> {
  try {
    const auth: Auth = getAuth(firebaseApp)
    const credential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
    const userData: UserData = {
      id: credential.user.uid,
      username: username,
      email: credential.user.email as string,
      bio: "I am a STAR in the VOID!",
      photo: "/default_profile_photo.svg"
    }
    await setDoc(doc(firebaseDB, USERS_COLLECTION, credential.user.uid), userData)
    return userData
  } catch (error: any) {
    logError(error)
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
    logError(error)
    return null
  }
}

export async function getUser(userID: string): Promise<UserData | null> {
  try {
    const snapshot = await getDoc(doc(firebaseDB, USERS_COLLECTION, userID))
    if (snapshot.exists()) {
      const userData: UserData = snapshot.data() as UserData
      return userData
    } else {
      return null
    }
  } catch (error: any) {
    logError(error)
    return null
  }
}

export async function updateUser(userData: UserData): Promise<boolean> {
  try {
    const reference: DocumentReference = doc(firebaseDB, USERS_COLLECTION, userData.id)
    await updateDoc(reference, userData)
    return true
  } catch (error: any) {
    logError(error)
    return false
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

function logError(error: any): void {
  console.error("[ERROR ", error.code, "]: ", error.message)
}

