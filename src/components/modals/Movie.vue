<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue';
import IconLoader from '/icon-loader-dark.svg'
import IconImdb from '/icon-imdb.svg'
import IconMetacritic from '/images/icon-metacritic.png'
import IconRottenTomatoes from '/images/icon-rotten-tomatoes.png'
import { useMovieStore } from '../../store/movies';
import Modal from './Modal.vue'

const movieStore = useMovieStore()

onMounted(() => {
  document.querySelector('body')!.style.overflowY = 'hidden'
})
onUnmounted(() => {
  document.querySelector('body')!.style.overflowY = 'unset'
})
</script>

<template>
  <Modal @close="movieStore.toggleMovieModal(null)" ref="modalRef">
    <template #header>
      <template v-if="!movieStore.movieModalLoader">
        <h2 class="text-2xl md:text-4xl font-semibold">
          {{ movieStore.currentMovie.Title }}
        </h2>
      </template>
    </template>
    <template #body>
      <div class="overflow-y-scroll">
        <template v-if="movieStore.movieModalLoader">
          <img :src="IconLoader" alt="Loading" :width="28" :height="28" class="rotating mt-4 mx-auto" /> 
        </template>
        <template v-else>
          <img :src="movieStore.currentMovie.Poster" :alt="movieStore.currentMovie.Title" class="mt-4 mx-auto" />
          <ul class="flex w-full justify-center gap-4 mt-4 items-end">
            <li v-for="(item, k) in movieStore.currentMovie.Ratings" :key="k">
              <template v-if="item.Source === 'Rotten Tomatoes'">
                <img :src="IconRottenTomatoes" alt="rotten tomatoes" :width="56" :height="56" />
                <p class="text-center font-semibold">
                  {{ item.Value }}
                </p>
              </template>
              <template v-if="item.Source === 'Metacritic'">
                <img :src="IconMetacritic" alt="Metacritic" :width="56" :height="56" />
                <p class="text-center font-semibold">
                  {{ item.Value }}
                </p>
              </template>
              <template v-if="item.Source === 'Internet Movie Database'">
                <img :src="IconImdb" alt="Imdb" :width="64" :height="64" />
                <p class="text-center font-semibold">
                  {{ item.Value }}
                </p>
              </template>
            </li>
          </ul>
          <p class="text-base mt-8">
            {{ movieStore.currentMovie.Plot }}
          </p>
          <ul class="flex flex-col mt-8">
            <li v-for="item in movieStore.currentMovie.Actors.split(',')">
              {{ item }}
            </li>
          </ul>
          <p class="text-base mt-4 text-center font-semibold">
            {{ movieStore.currentMovie.Released }}
            <br>
            {{ movieStore.currentMovie.Country }}
          </p>
        </template>
      </div>
    </template>
  </Modal>
</template>