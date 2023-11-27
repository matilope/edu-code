<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import PrimaryLabel from "../components/PrimaryLabel.vue";
import { ref, inject } from "vue";
import { useAuth } from "../composition/useAuth.js";
import { editUser, editUserAvatar } from "../services/auth";
import { notificationSymbol } from "../symbols/notification";
import { numberToCurrency } from "../helpers/price.js";
import Loader from "../components/Loader.vue";

const { setNotification } = inject(notificationSymbol);
const { user } = useAuth();

const {
  editUserData,
  editing,
  editingLoading,
  handleEditShow,
  handleEditCancel,
  handleEditForm,
} = useEdit(user);

const {
  editingAvatar,
  editingAvatarLoading,
  editUserAvatarData,
  handleAvatarCancel,
  handleAvatarShow,
  handleAvatarForm,
  handleAvatarFileChange,
} = useAvatarEdit();

function useEdit(user) {
  const editing = ref(false);
  const editingLoading = ref(false);
  const editUserData = ref({
    displayName: "",
  });

  const handleEditShow = () => {
    editUserData.value.displayName = user.value.displayName;
    editing.value = true;
  };

  const handleEditCancel = () => (editing.value = false);

  const handleEditForm = async () => {
    try {
      editingLoading.value = true;
      await editUser({
        displayName: editUserData.value.displayName,
      });
      setNotification({
        message: "Tu perfil se ha actualizado correctamente.",
        type: "success",
      });
      handleEditCancel();
    } catch ({ message }) {
      setNotification({
        message,
        type: "error",
      });
    } finally {
      editingLoading.value = false;
    }
  };

  return {
    editUserData,
    editing,
    editingLoading,
    handleEditShow,
    handleEditCancel,
    handleEditForm,
  };
}

function useAvatarEdit() {
  const editingAvatar = ref(false);
  const editingAvatarLoading = ref(false);
  const editUserAvatarData = ref({
    file: null,
    preview: null,
  });

  const handleAvatarShow = () => (editingAvatar.value = true);

  const handleAvatarCancel = () => {
    editingAvatar.value = false;
    editUserAvatarData.value.file = null;
    editUserAvatarData.value.preview = null;
  };

  const handleAvatarForm = async () => {
    editingAvatarLoading.value = true;
    try {
      await editUserAvatar(editUserAvatarData.value.file);
      setNotification({
        message: "Tu foto de perfil se actualizó correctamente.",
        type: "success",
      });
      handleAvatarCancel();
    } catch ({ message }) {
      setNotification({
        message,
        type: "error",
      });
    } finally {
      editingAvatarLoading.value = false;
    }
  };

  const handleAvatarFileChange = (event) => {
    editUserAvatarData.value.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      editUserAvatarData.value.preview = reader.result;
    };
    reader.readAsDataURL(editUserAvatarData.value.file);
  };

  return {
    editingAvatar,
    editingAvatarLoading,
    editUserAvatarData,
    handleAvatarCancel,
    handleAvatarShow,
    handleAvatarForm,
    handleAvatarFileChange,
  };
}
</script>

<template>
  <section
    class="profile relative flex flex-col w-full min-w-0 mb-6 break-words border bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable"
  >
    <template v-if="user.userLoaded">
      <template v-if="!editing && !editingAvatar">
        <div class="px-6 pt-8 flex-auto min-h-[70px] pb-0 bg-transparent">
          <div class="flex flex-wrap mb-6 xl:flex-nowrap">
            <div class="mb-5 mr-5">
              <div class="relative inline-block shrink-0 rounded-2xl">
                <img
                  v-if="user.photoURL"
                  class="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
                  :src="user.photoURL"
                  :alt="'Perfil de ' + user.displayName"
                />
                <img
                  v-else
                  class="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
                  src="images/user.png"
                  :alt="'Perfil de ' + user.displayName"
                />
                <button
                  class="btn-change-image"
                  @click="handleAvatarShow"
                  title="Cambiar imagen de perfil"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-camera-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path
                      d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="grow">
              <div class="flex flex-wrap items-start justify-between mb-2">
                <div class="flex flex-col">
                  <div class="flex items-center mb-2">
                    <h1
                      class="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1"
                    >
                      Perfil de {{ user.displayName || "..." }}
                    </h1>
                  </div>
                  <div class="flex flex-wrap pr-2 mb-2 font-medium">
                    <a
                      class="flex items-center mr-5 text-secondary-dark hover:text-primary"
                      :href="'mailto:' + user.email"
                    >
                      <span class="mr-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
                          />
                          <path
                            d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
                          />
                        </svg>
                      </span>
                      {{ user.email }}
                    </a>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap justify-between mb-4">
                <div class="flex flex-wrap items-center">
                  <span
                    class="inline-flex items-center justify-center text-secondary-inverse rounded-full transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal capitalize"
                    :class="{
                      'badge-user': user.role == 'user',
                      'badge-admin': user.role == 'admin',
                    }"
                    >{{
                      user.role == "user" ? "Usuario" : "Administrador"
                    }}</span
                  >
                </div>
              </div>
              <div class="flex flex-wrap gap-3">
                <PrimaryButton class="h-[2.25rem]" @click="handleEditShow"
                  >Editar datos de perfil</PrimaryButton
                >
              </div>
              <hr class="w-full h-px border-neutral-200 my-5" />
              <div class="flex flex-wrap justify-between">
                <div class="flex flex-wrap items-center">
                  <template v-if="user.role === 'user'">
                    <router-link
                      to="/chat"
                      class="underline text-blue-600 hover:text-blue-600"
                      >Chatear con el administrador</router-link
                    >
                  </template>
                  <template v-else>
                    <router-link
                      to="/usuarios"
                      class="underline text-blue-600 hover:text-blue-600"
                      >Ver el listado de usuarios</router-link
                    >
                  </template>
                </div>
              </div>
            </div>
          </div>
          <hr class="w-full h-px border-neutral-200" />
          <h2 class="text-2xl my-3">Servicios contratados</h2>
          <div class="hired-services-container my-4">
            <template v-if="user.services">
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table
                  class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3">Imagen</th>
                      <th scope="col" class="px-6 py-3">Nombre</th>
                      <th scope="col" class="px-6 py-3">Precio</th>
                      <th scope="col" class="px-6 py-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="service in services">
                      <tr
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img :src="service.image" :alt="service.title" />
                        </th>
                        <td class="px-6 py-4">
                          {{ service.title }}
                        </td>
                        <td class="px-6 py-4">
                          {{ numberToCurrency(service.price) }}
                        </td>
                        <td class="px-6 py-4">
                          <router-link
                            :to="'cursos/' + service.id"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >Ver</router-link
                          >
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </template>
            <template v-else>
              <p>No tienes cursos contratados</p>
            </template>
          </div>
        </div>
      </template>
      <template v-else-if="editing && !editingAvatar">
        <div class="profile-edition">
          <form action="#" method="post" @submit.prevent="handleEditForm">
            <div class="mb-2">
              <PrimaryLabel for="displayName">Nombre del usuario</PrimaryLabel>
              <PrimaryInput
                id="displayName"
                :disabled="editingLoading"
                v-model="editUserData.displayName"
                class="max-w-full w-[400px]"
              />
            </div>
            <div class="flex items-center gap-3 mt-5">
              <PrimaryButton type="submit" :loading="editingLoading">
                Actualizar mis Datos
              </PrimaryButton>
              <PrimaryButton
                type="reset"
                class="bg-yellow-600 hover:bg-yellow-500"
                @click="handleEditCancel"
                >Cancelar</PrimaryButton
              >
            </div>
          </form>
        </div>
      </template>
      <template v-else-if="!editing && editingAvatar">
        <div class="profile-edition">
          <form action="#" method="post" @submit.prevent="handleAvatarForm">
            <div class="mb-2">
              <PrimaryLabel for="avatar">Imagen de perfil</PrimaryLabel>
              <div
                class="div-input-img mt-2 flex justify-center rounded-lg border border-gray-900/25 px-6 py-10"
              >
                <div class="text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <div
                    class="mt-4 flex justify-center text-sm leading-6 text-gray-600"
                  >
                    <label
                      class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Subir imagen</span>
                      <input
                        type="file"
                        id="avatar"
                        class="sr-only"
                        :disabled="editingAvatarLoading"
                        @change="handleAvatarFileChange"
                      />
                    </label>
                  </div>
                  <p class="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF, JPEG
                  </p>
                </div>
              </div>
            </div>
            <div
              class="mt-4 mb-2"
              v-if="
                editUserAvatarData.preview !== null || user.photoURL !== null
              "
            >
              <img
                class="rounded-md object-contain w-[400px]"
                :src="editUserAvatarData.preview"
                alt=""
              />
            </div>
            <div class="flex items-center gap-3 mt-5">
              <PrimaryButton :loading="editingAvatarLoading"
                >Actualizar imagen de perfil</PrimaryButton
              >
              <PrimaryButton
                @click="handleAvatarCancel"
                type="reset"
                class="bg-yellow-600 hover:bg-yellow-500"
                >Cancelar</PrimaryButton
              >
            </div>
          </form>
        </div>
      </template>
    </template>
    <template v-else>
      <Loader class="flex justify-center my-4" />
    </template>
  </section>
</template>
