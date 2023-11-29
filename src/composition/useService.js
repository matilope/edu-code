import { onMounted, ref, inject, onUnmounted } from "vue";
import { getServiceById, subscribeToServices } from "../services/services";
import { useRouter } from "vue-router";
import { notificationSymbol } from "../symbols/notification";

export function useService(id) {
  const { setNotification } = inject(notificationSymbol);
  const router = useRouter();
  const serviceLoading = ref(true);
  const service = ref({
    id: null,
    title: null,
    description: null,
    price: null,
    created_at: null,
    level: null,
    technologies: null,
    duration: null,
    image: null,
    image_description: null
  });

  onMounted(async () => {
    serviceLoading.value = true;
    try {
      service.value = await getServiceById(id);
      serviceLoading.value = false;
    } catch ({ message }) {
      setNotification({
        message,
        type: "error",
      });
      router.push("/");
    } finally {
      serviceLoading.value = false;
    }
  });

  return {
    service,
    serviceLoading,
  }
}

export function useServices() {
  const servicesLoading = ref(true);
  const services = ref([]);
  let unSubscribeServices = () => {};

  onMounted(() => {
    unSubscribeServices = subscribeToServices(newServices => services.value = [...newServices]);
    servicesLoading.value = false;
  });

  onUnmounted(() => unSubscribeServices());

  return {
    services,
    servicesLoading
  }
}