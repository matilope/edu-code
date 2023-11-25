import { onMounted, ref } from "vue";
import { getUserById } from "../services/user";
import { useRouter } from "vue-router";
import { modalAlert } from "../helpers/modal";

export function useUser(id) {
  const router = useRouter();
  const userLoading = ref(true);
  const user = ref({
    id: null,
    name: null,
    email: null,
    role: null
  });

  onMounted(async () => {
    userLoading.value = true;
    try {
      user.value = await getUserById(id);
      userLoading.value = false;
    } catch ({ message }) {
      router.push("/");
      modalAlert(message, "error");
    } finally {
      userLoading.value = false;
    }
  });

  return {
    user,
    userLoading,
  }
}