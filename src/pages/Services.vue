<script setup>
import { dateToString } from "../helpers/date.js";
import { numberToCurrency } from "../helpers/price.js";
import Loader from "../components/Loader.vue";
import { useServices } from "../composition/useService";

const { services: servicesData, servicesLoading } = useServices();
</script>

<template>
  <section>
    <h1 class="text-3xl md:text-4xl lg:text-5xl mb-8">Cursos</h1>
    <div class="services">
      <template v-if="!servicesLoading">
        <article
          class="max-w-sm rounded overflow-hidden shadow-lg"
          v-for="service in servicesData"
          :key="service.id"
        >
          <router-link :to="'cursos/' + service.id">
            <img class="w-full" :src="service.image" :alt="service.image_description ? service.image_description : service.title" v-if="service.image" />
            <img class="w-full" src="images/default.jpg" :alt="service.image_description ? service.image_description : service.title" v-else />
            <div class="px-6 py-4">
              <h2 class="font-bold text-xl mb-2" :title="service.title">
                {{ service.title }}
              </h2>
              <p class="text-gray-700 text-base">
                {{ service.description }}
              </p>
              <span class="price">{{ numberToCurrency(service.price) }}</span>
              <span
                class="date inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800"
                >{{ dateToString(service.created_at) }}</span
              >
            </div>
            <div class="px-6 pt-4 pb-2">
              <span
                class="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"
                >{{ service.level }}</span
              >
              <span
                class="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"
                >{{ service.technologies }}</span
              >
              <span
                class="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"
                >{{ service.duration }} horas</span
              >
            </div>
          </router-link>
        </article>
      </template>
      <template v-else>
        <Loader />
      </template>
    </div>
  </section>
</template>
