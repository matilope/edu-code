import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";

export async function getUserById(id) {
    const refUser = doc(db, `users/${id}`);
    const docSnapshot = await getDoc(refUser);

    return {
        id: docSnapshot.id,
        email: docSnapshot.data().email,
        role: docSnapshot.data().role
    }
}

export function createUser(id, data) {
    return setDoc(doc(db, `users/${id}`), { ...data, created_at: serverTimestamp() });
}