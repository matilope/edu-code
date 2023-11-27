import { onMounted, ref, inject, onUnmounted } from "vue";
import { getUserById, subscribeToUsers } from "../services/user";
import { useRouter } from "vue-router";
import { notificationSymbol } from "../symbols/notification";

export function useUser(id) {
  const { setNotification } = inject(notificationSymbol);
  const router = useRouter();
  const userLoading = ref(true);
  const user = ref({
    id: null,
    displayName: null,
    photoURL: null,
    email: null,
    role: null
  });

  onMounted(async () => {
    userLoading.value = true;
    try {
      user.value = await getUserById(id);
      userLoading.value = false;
    } catch ({ message }) {
      setNotification({
        message,
        type: "error",
      });
      router.push("/");
    } finally {
      userLoading.value = false;
    }
  });

  return {
    user,
    userLoading,
  }
}

export function useUsers() {
  const usersLoading = ref(true);
  const users = ref([]);
  let unsubscribeToUsers = () => { };

  onMounted(() => {
    unsubscribeToUsers = subscribeToUsers(user => users.value = { ...user });
    usersLoading.value = false;
  });

  onUnmounted(() => unsubscribeToUsers());

  return {
    users,
    usersLoading
  }
}