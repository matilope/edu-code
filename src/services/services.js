import { db } from './firebase.js';
import { addDoc, collection, onSnapshot, getDoc, serverTimestamp, doc, query, orderBy, deleteDoc, updateDoc } from 'firebase/firestore';
import { getFile, uploadFile, deleteFile } from './storage.js';

const refService = collection(db, 'services');

export async function saveService(data) {
  try {
    const document = await addDoc(refService, {
      ...data,
      image: null,
      created_at: serverTimestamp()
    });
    await editService(document.id, { image: data.image });
    return { status: true };
  } catch ({ message }) {
    return message;
  }
}

export async function editService(id, data) {
  //const title = data.title.split(" ").join("").split(".").join("");
  const path = `services/${id}/image`;
  try {
    if (data.image.name) {
      await uploadFile(path, data.image);
      const photoURL = await getFile(path);
      data.image = photoURL;
    }
    await updateDoc(doc(db, `services/${id}`), { ...data });
    return { status: true };
  } catch ({ message }) {
    return message;
  }
}

export async function deleteService(id) {
  const refService = doc(db, 'services', id);
  const path = refService.path + "/image";
  try {
    await deleteDoc(refService);
    await deleteFile(path);
    return { status: true };
  } catch ({ message }) {
    return message;
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
        image: null,
        image_description: null,
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

export function subscribeToServices(callback) {
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