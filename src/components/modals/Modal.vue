<script setup lang="ts">
import { useStore } from '../../store';
import IconClose from '/icon-close.svg'
const store = useStore()
</script>

<template>
  <div class="w-[100vw] h-[100vh] bg-black opacity-75 fixed top-0 left-0"></div>
  <div class="w-[100vw] h-[100vh] md:w-[80vw] md:h-[70vh] fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 bg-white md:rounded-2xl py-4 px-6">
    <header class="flex items-center justify-between flex-row-reverse">
      <div class="flex justify-end self-end">
        <button @click="store.toggleLoginModal()" class="p-1 cursor-pointer">
          <img :src="IconClose" alt="Close" :width="24" :height="24" />
        </button>
      </div>
      <slot name="header" />
    </header>
    <section>
      <slot name="body" />
    </section>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>