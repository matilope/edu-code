import { ref, onMounted, onUnmounted } from 'vue';
import { subscribeToAuth } from './../services/auth';

export function useAuth() {
  const user = ref({
    id: null,
    name: null,
    email: null,
    role: null,
  });
  let unSubscribeAuth = () => {};

  onMounted(() => {
    unSubscribeAuth = subscribeToAuth(newUser => user.value = { ...newUser })
  });

  onUnmounted(() => unSubscribeAuth());

  return {
    user,
  }
}