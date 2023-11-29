import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadFile(path, file) {
  const fileRef = ref(storage, path);
  return uploadBytes(fileRef, file);
}

export async function getFile(path) {
  return getDownloadURL(ref(storage, path));
}

export async function deleteFile(path) {
  const desertRef = ref(storage, path);
  return deleteObject(desertRef);
}