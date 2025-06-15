<script setup lang="ts">
import IconClose from '/icon-close.svg'

defineProps({
  direction: {
    type: String,
    default: 'center'
  }
})

defineEmits([
  'close'
])
</script>

<template>
  <div class="w-[100vw] h-[100vh] bg-black opacity-75 fixed top-0 left-0" @click="$emit('close')"></div>
  <div 
    :class="[
      'fixed bg-white md:rounded-2xl py-4 px-6 md:max-w-3xl md:max-h-[500px]',
      {
        'top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 w-[100vw] h-[100vh] md:w-[80vw] md:h-[70vh]': direction === 'center',
        'left-0 top-0 w-[80vw] h-[100vh] md:left-2/4 md:top-2/4 md:-translate-2/4': direction === 'left'
      }
    ]"
  >
    <header class="flex items-center justify-between flex-row-reverse">
      <div class="flex justify-end self-end">
        <button @click="$emit('close')" class="p-1 cursor-pointer">
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