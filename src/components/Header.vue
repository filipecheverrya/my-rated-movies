<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import Logo from '/logo.svg'
import IconUser from '/icon-user.svg'
import IconMenu from '/icon-menu.svg'
import IconSearch from '/icon-search.svg'
import IconClose from '/icon-close.svg'
import Register from './modals/Register.vue'
import { useAppStore } from '../store/app'
import UserMenu from './modals/UserMenu.vue'
import { useMovieStore } from '../store/movies'

const TITLE = 'My Rated Movies'
const store = useAppStore()
const storeMovies = useMovieStore()
const searchInputRef = useTemplateRef('input-search')
const inputSearchFocused = ref(false)
const searchValue = ref('')

const handleSearchIconClick = () => {
  inputSearchFocused.value = true
  searchInputRef.value?.focus()
}
const handleSearchInputBlur = () => {
  inputSearchFocused.value = false
}
const handleClearSearchInputClick = () => {
  searchValue.value = ''
  searchInputRef.value?.focus()
  storeMovies.resetSearch()
}
</script>

<template>
  <header class="flex justify-between px-4 md:px-6 py-4">
    <div class="flex items-center justify-center gap-2">
      <img :src="Logo" :alt="TITLE" :width="36" :height="36" class="hidden md:flex" />
      <h1 class="text-2xl font-semibold tracking-tight">{{ TITLE }}</h1>
    </div>
    <div class="flex items-center gap-2">
      <div :class="[
        'fixed top-0 left-0 w-[100vw] h-[100vh] opacity-0 flex', 
        { 'hidden': !inputSearchFocused }
        ]"
        @click="handleSearchInputBlur"
      ></div>
      <label for="search" :class="[{
        'w-0 overflow-hidden': !inputSearchFocused, 
        'fixed w-full p-4 left-2/4 -translate-x-2/4 bg-white': inputSearchFocused 
      }]">
        <form @submit.prevent="storeMovies.getMoviesByString(searchValue)">
          <input 
            type="text" 
            name="search" 
            id="search" 
            placeholder="Search by title" 
            v-model="searchValue"
            ref="input-search" 
            class="input-default"  
          />
          <button 
            type="button" 
            :class="[
              'button-icon absolute right-5 top-2/4 -translate-y-2/4 cursor-pointer', 
              { '!hidden': !inputSearchFocused }
            ]" 
            @click="handleClearSearchInputClick"
          >
            <img :src="IconClose" alt="Clear" :width="18" :height="18" />
          </button>
          <button type="submit" hidden></button>
        </form>
      </label>
      <button class="button-icon" @click="handleSearchIconClick">
        <img :src="IconSearch" alt="Search by title" :width="24" :height="24" />
      </button>
      <template v-if="!store.user?.email">
        <button class="flex items-center justify-center bg-blue-500 rounded-full w-10 h-10 cursor-pointer" @click="store.toggleLoginModal()">
          <img :src="IconUser" alt="Fazer login" :width="22" :height="22" />
        </button>
      </template>
      <template v-else>
        <button class="flex items-center justify-center bg-transparent w10 h-10 cursor-pointer" @click="store.toggleUserMenu()">
          <img :src="IconMenu" alt="Menu" :width="32" :height="32" />
        </button>
      </template>
    </div>
  </header>
  <template v-if="store.showLoginModal">
    <Register />
  </template>
  <template v-if="store.showUserMenu">
    <UserMenu />
  </template>
</template>
