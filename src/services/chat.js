import { db } from './firebase.js';
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy, getDocs, limit, where } from 'firebase/firestore';

const privateChatRefCache = {};

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
  //if (!senderId || !receiverId) return;
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
  const cachedRef = getCache({ senderId, receiverId });
  if (cachedRef) return cachedRef;

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
  addCache({ senderId, receiverId }, privateChat);
  return privateChat;
}


function addCache({ senderId, receiverId }, value) {
  privateChatRefCache[getKeyCache({ senderId, receiverId })] = value;
}

function getCache({ senderId, receiverId }) {
  return privateChatRefCache[getKeyCache({ senderId, receiverId })] || null;
}

function getKeyCache({ senderId, receiverId }) {
  return senderId + receiverId;
}
