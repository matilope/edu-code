import { doc, getDoc, serverTimestamp, setDoc, onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { db } from "./firebase.js";

export async function getUserById(id) {
  const refUser = doc(db, `users/${id}`);

  try {
    const docSnapshot = await getDoc(refUser);
    if (!docSnapshot.exists()) {
      return {
        id: null,
        name: null,
        email: null,
        role: null
      }
    }
    return {
      id: docSnapshot.id,
      name: docSnapshot.data().name,
      email: docSnapshot.data().email,
      role: docSnapshot.data().role
    }
  } catch(err) {
    return false;
  }
}

export function createUser(id, data) {
  return setDoc(doc(db, `users/${id}`), { ...data, created_at: serverTimestamp() });
}


export function subscribeToUser(callback) {
  return onSnapshot(query(collection(db, 'users'), orderBy('created_at', 'desc')), (snapshot) => {
    const data = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        email: doc.data().email,
        created_at: doc.data().created_at?.toDate()
      }
    });
    callback(data);
  });
}