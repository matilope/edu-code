<script setup>
import Loader from "../components/Loader.vue";
import { useUsers } from "../composition/useUser";
import { useAuth } from "../composition/useAuth";

const { user: authUser } = useAuth();
const { users, usersLoading } = useUsers();
</script>

<template>
  <section
    class="profile relative flex flex-col w-full min-w-0 mb-6 break-words border bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable"
  >
    <template v-if="!usersLoading">
      <div class="p-4 flex-auto bg-transparent">
        <h1 class="text-3xl my-3">Usuarios registrados</h1>
        <div class="hired-services-container my-4">
          <template v-if="users">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                class="user-table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <thead
                  class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th scope="col" class="px-6 py-3">Imagen de perfil</th>
                    <th scope="col" class="px-6 py-3">Nombre</th>
                    <th scope="col" class="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="user in users">
                    <tr
                      class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
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
                      </th>
                      <td class="px-6 py-4">
                        {{ user.displayName || "Nombre no asignado" }} <template v-if="authUser.id === user.id"><span class="text-red-600 dark:text-red-500">(Yo)</span></template>
                      </td>
                      <td class="px-6 py-4">
                        <template v-if="authUser.id !== user.id">
                          <router-link
                            :to="'usuarios/' + user.id"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-5"
                            >Ver perfil</router-link
                          >
                          <router-link
                          :to="'usuarios/' + user.id + '/chat'"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >Ver chat</router-link
                          >
                        </template>
                        <template v-else>
                          <router-link
                            to="/perfil"
                            class="font-medium text-red-600 dark:text-red-500 hover:underline mr-5"
                            >Ver perfil</router-link
                          >
                        </template>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </template>
          <template v-else>
            <p>No hay usuarios registrados</p>
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <Loader class="flex justify-center" />
    </template>
  </section>
</template>
