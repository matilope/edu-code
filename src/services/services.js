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
  } catch ({message}) {
    return false;
  }
}

export async function deleteService(id) {
  const refService = doc(db, 'services', id);
  try {
    await deleteDoc(refService);
    return true;
  } catch ({message}) {
    return false;
  }
}

export async function getServiceById(id) {
  try {
    const docSnapshot = await getDoc(doc(db, `services/${id}`));
    return {
      id: docSnapshot.id,
      title: docSnapshot.data().title,
      description: docSnapshot.data().description,
      description: docSnapshot.data().description,
      duration: docSnapshot.data().duration,
      level: docSnapshot.data().level,
      technologies: docSnapshot.data().technologies,
      price: docSnapshot.data().price,
      created_at: docSnapshot.data().created_at?.toDate(),
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
        title: doc.data().title,
        description: doc.data().description,
        duration: doc.data().duration,
        level: doc.data().level,
        technologies: doc.data().technologies,
        price: doc.data().price,
        created_at: doc.data().created_at?.toDate()
      }
    });
    callback(data);
  });
}