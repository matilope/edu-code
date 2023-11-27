import { db } from './firebase.js';
import { addDoc, collection, onSnapshot, getDoc, serverTimestamp, doc, query, orderBy, deleteDoc, updateDoc } from 'firebase/firestore';

const refService = collection(db, 'services');

export async function saveService(data) {
  return addDoc(refService, {
    ...data,
    created_at: serverTimestamp()
  });
}

export async function editService(id, data) {
  try {
    await updateDoc(doc(db, `services/${id}`), data);
    return true;
  } catch ({ message }) {
    return false;
  }
}

export async function deleteService(id) {
  const refService = doc(db, 'services', id);
  try {
    await deleteDoc(refService);
    return true;
  } catch ({ message }) {
    return false;
  }
}

export async function getServiceById(id) {
  try {
    const docSnapshot = await getDoc(doc(db, `services/${id}`));
    if (!docSnapshot.exists()) {
      return {
        id: null,
        title: null,
        description: null,
        duration: null,
        level: null,
        technologies: null,
        price: null,
        created_at: null,
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

export function subscribeToService(callback) {
  return onSnapshot(query(refService, orderBy('created_at', 'desc')), (snapshot) => {
    const data = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    callback(data);
  });
}