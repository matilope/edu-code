import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.js';
import { createUser } from './user.js';

let user = {
  id: null,
  email: null,
  role: null
}

let observers = [];

if (localStorage.getItem('user')) {
  user = JSON.parse(localStorage.getItem('user'));
}

export async function register({ email, password }) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    createUser(user.uid, { email: user.email, role: 'usuario' });
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

onAuthStateChanged(auth, async (user) => {
  if (user) {
    getUser();
    setUser({
      id: user.uid,
      email: user.email,
      role: user.role
    });
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    clearUser();
    localStorage.removeItem('user');
  }
});

export function subscribeToAuth(observer) {
  observers.push(observer);
  notify(observer);
  return () => {
    observers = observers.filter(item => item !== observer);
  }
}

function notify(observer) {
  observer(getUser());
}

function notifyAll() {
  observers.forEach(observer => notify(observer));
}

function setUser(newUser) {
  user = {
    ...user,
    ...newUser
  }
  notifyAll();
}

function clearUser() {
  setUser({ id: null, email: null, role: null });
}

export function getUser() {
  return { ...user };
}