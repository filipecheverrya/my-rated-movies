<script setup lang="ts">
import Logo from '/logo.svg'
import IconUser from '/icon-user.svg'
import IconMenu from '/icon-menu.svg'
import Register from './modals/Register.vue'
import { useStore } from '../store'
import UserMenu from './modals/UserMenu.vue'

const TITLE = 'My Rated Movies'
const store = useStore()
</script>

<template>
  <header class="flex justify-between px-6 py-4">
    <div class="flex items-center justify-center gap-2">
      <img :src="Logo" :alt="TITLE" :width="36" :height="36" />
      <h1 class="text-2xl font-semibold tracking-tight">{{ TITLE }}</h1>
    </div>
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
  </header>
  <template v-if="store.showLoginModal">
    <Register />
  </template>
  <template v-if="store.showUserMenu">
    <UserMenu />
  </template>
</template>
