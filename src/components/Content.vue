<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovieStore } from '../store/movies'
import IconIMDB from '/icon-imdb.svg'

const movieStore = useMovieStore()

onMounted(() => {
  movieStore.getTopRatedMovies()
})
</script>

<template>
  <div class="px-6 mt-8">
    <template v-if="movieStore.searchedListError">
      <p class="text-2xl text-center text-red-500 font-semibold mt-5">
        {{ movieStore.searchedListError }}
      </p>
    </template>
    <template v-if="!movieStore.searchedList.length">
      <h2 class="text-4xl">
        Top Movies of 2025
      </h2>
      <ul class="grid grid-col-1 lg:grid-cols-5 gap-6 lg:gap-2 mt-6">
        <li v-for="item in movieStore.topRatedMovies">
          <img :src="item.Poster" :alt="item.Title" class="block mx-auto h-[400px]" />
          <div class="flex flex-col gap-2 max-w-3xs mx-auto">
            <h3 class="text-lg text-center mt-4 font-semibold">
              {{ item.Title }}
            </h3>
            <p class="text-sm">
              {{ item.Plot }}
            </p>
            <div class="flex items-center justify-center gap-4">
              <img :src="IconIMDB" alt="IMDb" :width="80" :height="80" />
              <div>
                <p class="text-base">
                  <span class="font-bold">Rating: </span> {{ item.imdbRating }}
                </p>
                <p class="text-base">
                  <span class="font-bold">Votes: </span> {{ item.imdbVotes }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <h2 class="text-4xl">
        Searched movies
      </h2>
      <ul class="flex flex-wrap mx-auto w-full items-center justify-center gap-2 my-6">
        <li v-for="item in movieStore.searchedList" :key="item.Title">
          <img :src="item.Poster" :alt="item.Title" class="block mx-auto max-w-[150px]" />
        </li>
      </ul>
    </template>
  </div>
</template>