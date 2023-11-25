import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.js';
import { createUser, getUserById } from './user.js';

let user = {
  id: null,
  name: null,
  email: null,
  role: null,
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
      email: user.email,
    });
    const userData = await getUserById(user.uid);
    if (userData) {
      setUser({
        name: userData.name,
        role: userData.role,
        userLoaded: true
      });
    }
  } else {
    clearUser();
  }
});

export async function register({ name, email, password }) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await createUser(user.uid, { name, email: user.email, role: 'user' });
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
  setUser({ id: null, name: null, email: null, role: null });
  localStorage.removeItem('user');
}

export function getUser() {
  return { ...user };
}