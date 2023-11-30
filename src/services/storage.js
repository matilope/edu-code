import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

/**
 * @param {{path: string}} path
 * @param {{file: File}} file
 * @returns {Promise}
 */
export async function uploadFile(path, file) {
  const fileRef = ref(storage, path);
  return uploadBytes(fileRef, file);
}

/**
 * @param {{path: string}} path
 * @returns {Promise}
 */
export async function getFile(path) {
  return getDownloadURL(ref(storage, path));
}

/**
 * @param {{path: string}} path
 * @returns {Promise}
 */
export async function deleteFile(path) {
  const desertRef = ref(storage, path);
  return deleteObject(desertRef);
}