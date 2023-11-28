import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase.js';
import { createUser, getUserById, updateUser } from './user.js';
import { getFile, uploadFile } from './storage.js';

let user = {
  id: null,
  displayName: null,
  email: null,
  photoURL: null,
  role: null,
  services: [],
  userLoaded: false
}

let observers = [];

if (localStorage.getItem('user')) {
  user = JSON.parse(localStorage.getItem('user'));
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    setUser({
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    });
    const userData = await getUserById(user.uid);
    if (userData) {
      setUser({
        role: userData.role,
        services: userData.services || [],
        userLoaded: true
      });
    }
  } else {
    clearUser();
  }
});

export async function register({ displayName, email, password }) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await createUser(user.uid, { displayName, email: user.email, role: 'user' });
    await updateProfile(auth.currentUser, { displayName });
    return { ...user }
  }
  catch ({ code, message }) {
    return {
      code,
      message
    };
  }
}

export async function logIn({ email, password }) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { ...user }
  } catch ({ code, message }) {
    return {
      code,
      message
    };
  }
}

export function logOut() {
  return signOut(auth);
}

export function subscribeToAuth(observer) {
  observers.push(observer);
  notify(observer);
  return () => {
    observers = observers.filter(item => item !== observer);
  }
}

function notifyAll() {
  observers.forEach(observer => notify(observer));
}

function notify(observer) {
  observer(getUser());
}

function setUser(newUser) {
  user = {
    ...user,
    ...newUser
  }
  localStorage.setItem('user', JSON.stringify(user));
  notifyAll();
}

function clearUser() {
  setUser({ id: null, displayName: null, email: null, photoURL: null, role: null, services: [], userLoaded: false });
  localStorage.removeItem('user');
}

export function getUser() {
  return { ...user };
}

export async function editUser({ displayName, photoURL }) {
  const userData = {};
  try {
    if (displayName) userData.displayName = displayName;
    if (photoURL) userData.photoURL = photoURL;
    const promiseAuth = updateProfile(auth.currentUser, userData);
    const promiseProfile = updateUser(user.id, userData);
    await Promise.all([promiseAuth, promiseProfile]);
    setUser(userData);
  } catch ({ message }) {
    throw new Error(message);
  }
}

export async function editUserAvatar(file) {
  const path = `users/${user.id}/avatar`;
  try {
    await uploadFile(path, file);
    const photoURL = await getFile(path);
    return editUser({
      photoURL,
    });
  }
  catch ({ message }) {
    throw new Error(message);
  }
}