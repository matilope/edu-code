<script setup>
import ChatLoader from "../components/ChatLoader.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryTextarea from "../components/PrimaryTextarea.vue";
import PrimaryLabel from "../components/PrimaryLabel.vue";
import { timeToString, dateToString } from "../helpers/date";
import {
  sendPrivateMessage,
  subscribeToPrivateChat,
} from "../services/chat.js";
import { useRouter } from "vue-router";
import { onUnmounted, ref, onMounted, inject } from "vue";
import { useAuth } from "../composition/useAuth";
import { notificationSymbol } from "../symbols/notification";

const { setNotification } = inject(notificationSymbol);
const router = useRouter();
const { user: authUser } = useAuth();
const adminId = ref({ id: "RzfSLE6IlIRpb8kuDETD34I0rE82" });
const { newMessage, messages, messagesLoading, sendMessage } = usePrivateChat(
  authUser,
  adminId
);

const showDate = (message, index) => {
  if (index === 0) return true;
  const currentMessageDate = dateToString(message?.created_at);
  const previousMessageDate = dateToString(
    messages.value[index - 1]?.created_at
  );
  return currentMessageDate !== previousMessageDate;
};

const sendMessageOnEnter = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    sendMessage();
  }
};

function usePrivateChat(senderUser, receiverUser) {
  const messagesLoading = ref(true);
  const newMessage = ref("");
  const messages = ref([]);
  let unSubscribeMessage = () => {};

  async function sendMessage() {
    sendPrivateMessage({
      senderId: senderUser.value.id,
      receiverId: receiverUser.value.id,
      message: newMessage.value,
    });
    newMessage.value = "";
  }

  onMounted(async () => {
    try {
      unSubscribeMessage = await subscribeToPrivateChat(
        {
          senderId: senderUser.value.id,
          receiverId: receiverUser.value.id,
        },
        (newMessages) => (messages.value = newMessages)
      );
    } catch ({ message }) {
      setNotification({
        message,
        type: "error",
      });
      router.push("/perfil");
    } finally {
      messagesLoading.value = false;
    }
  });

  onUnmounted(() => unSubscribeMessage());

  return {
    messagesLoading,
    newMessage,
    messages,
    sendMessage,
  };
}
</script>

<template>
  <section>
    <h1 class="text-3xl md:text-4xl lg:text-5xl mb-8">
      Chat con Administrador
    </h1>

    <h2 class="sr-only">Mensajes</h2>
    <div class="chat-container">
      <ChatLoader v-if="messagesLoading" />
      <template v-else>
        <template v-if="messages.length == 0">
          <div class="m-auto my-4 bg-gray-200 rounded-md py-2 px-3">
            <p>No hay mensajes en el chat</p>
          </div>
        </template>
        <template v-else>
          <div
            v-for="(message, index) in messages"
            :key="message.id"
            class="message-container"
          >
            <div class="date" v-if="showDate(message, index)">
              {{ dateToString(message.created_at) }}
            </div>
            <div
              class="message"
              :class="{
                'bg-gray-100': message.senderId !== authUser.id,
                'bg-green-200': message.senderId === authUser.id,
                'self-end': message.senderId === authUser.id,
                'self-start': message.senderId !== authUser.id,
              }"
            >
              <div>{{ message.message }}</div>
              <div class="text-right">
                {{ timeToString(message.created_at) || "Enviando..." }}
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>

    <h2 class="sr-only">Enviar mensajes</h2>
    <form
      class="flex gap-4 items-start"
      action="#"
      @submit.prevent="sendMessage"
    >
      <PrimaryLabel for="message" class="sr-only">Mensaje</PrimaryLabel>
      <PrimaryTextarea
        id="message"
        placeholder="Escribir mensaje..."
        v-model="newMessage"
        rows="2"
        @keyup.enter="sendMessageOnEnter"
        required
      />
      <PrimaryButton
        class="hidden sm:flex w-16 h-[3rem] sm:w-24 sm:h-[4.5rem]"
        title="Enviar"
        aria-label="Enviar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-send-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"
          />
        </svg>
      </PrimaryButton>
      <PrimaryButton
        class="flex sm:hidden w-16 h-[3rem] sm:w-24 sm:h-[4.5rem]"
        title="Enviar"
        aria-label="Enviar"
      >
        Enviar
      </PrimaryButton>
    </form>
  </section>
</template>
