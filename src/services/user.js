import { doc, getDoc, serverTimestamp, setDoc, onSnapshot, query, collection, orderBy, updateDoc } from "firebase/firestore";
import { db } from "./firebase.js";

/**
 * @param {{id: string}} id
 * @returns {Promise}
 */
export async function getUserById(id) {
  const refUser = doc(db, `users/${id}`);
  try {
    const docSnapshot = await getDoc(refUser);
    if (!docSnapshot.exists()) {
      return {
        id: null,
        displayName: null,
        photoURL: null,
        email: null,
        role: null,
        services: []
      }
    }
    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    }
  } catch (err) {
    return false;
  }
}

/**
 * @param {{id: string}} id
 * @param {{data: object}} data
 * @returns {Promise}
 */
export function createUser(id, data) {
  return setDoc(doc(db, `users/${id}`), { ...data, created_at: serverTimestamp() });
}

/**
 * @param {() => {}} callback
 * @returns {Promise}
 */
export function subscribeToUsers(callback) {
  return onSnapshot(query(collection(db, 'users'), orderBy('created_at', 'desc')), (snapshot) => {
    const data = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    callback(data);
  });
}

/**
 * @param {{id: string}} id
 * @param {{data: object}} data
 * @returns {Promise}
 */
export async function updateUser(id, data) {
  return updateDoc(doc(db, `users/${id}`), { ...data });
}

/**
 * @param {{user: object}} user
 * @returns {Promise}
 */
export async function hireService(user) {
  try {
    await updateUser(user.value.id, { services: user.value.services });
  } catch ({ message }) {
    throw new Error(message);
  }
}