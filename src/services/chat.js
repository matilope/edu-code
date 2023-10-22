import { db } from './firebase.js';
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy, getDocs, limit, where } from 'firebase/firestore';

const privateChatRefCache = {};

const refChat = collection(db, 'chats');
/*
export function sendMessage(data) {
  // validar data!!!!!!!!!!!!!
  return addDoc(refChat, {
    ...data,
    created_at: serverTimestamp()
  });
}

export function subscribeChat(callback) {
  return onSnapshot(query(refChat, orderBy('created_at', 'desc')), (snapshot) => {
    const data = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        userId: doc.data().userId,
        user: doc.data().user,
        message: doc.data().message,
        created_at: doc.data().created_at?.toDate()
      }
    });
    callback(data);
  });
}
*/

/* Private chat */

export async function sendPrivateMessage({ senderId, receiverId, message }) {
  const privateChat = await getPrivateChat({ senderId, receiverId });
  const messagesRef = collection(db, `chats/${privateChat.id}/messages`);
  await addDoc(messagesRef, {
    senderId,
    message,
    created_at: serverTimestamp(),
  });
  return true;
}

export async function subscribeToPrivateChat({ senderId, receiverId }, callback) {
  const privateChat = await getPrivateChat({ senderId, receiverId });
  const messagesRef = collection(db, `chats/${privateChat.id}/messages`);
  const q = query(
    messagesRef,
    orderBy('created_at')
  );
  return onSnapshot(q, snapshot => {
    const messages = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        senderId: doc.data().senderId,
        message: doc.data().message,
        created_at: doc.data().created_at?.toDate(),
      }
    });
    callback(messages);
  });
}

export async function getPrivateChat({ senderId, receiverId }) {
  /* const cachedRef = getCache({ senderId, receiverId });
  if (cachedRef) return cachedRef; */

  const privateChatRef = collection(db, 'chats');
  const q = query(
    privateChatRef,
    where(
      'users',
      '==',
      {
        [senderId]: true,
        [receiverId]: true,
      }
    ),
    limit(1),
  );
  const snapshot = await getDocs(q);
  let privateChat;
  if (snapshot.empty) {
    privateChat = await addDoc(privateChatRef, {
      users: {
        [senderId]: true,
        [receiverId]: true,
      }
    });
  } else {
    privateChat = snapshot.docs[0];
  }
  /* addCache({ senderId, receiverId }, privateChat); */
  return privateChat;
}

/*
function addCache({ senderId, receiverId }, value) {
  privateChatRefCache[getKeyCache()] = value;
}

function getCache({ senderId, receiverId }) {
  return privateChatRefCache[getKeyCache()] || null;
}

function getKeyCache({ senderId, receiverId }) {
  return senderId + receiverId;
}
*/