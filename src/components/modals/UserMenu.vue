<script setup lang="ts">
import { useAppStore } from '../../store/app';
import Modal from './Modal.vue';

const store = useAppStore()
</script>

<template>
  <Modal direction="left" @close="store.toggleUserMenu()">
    <template #body>
      <div class="mt-4">
        <p class="text-base text-nowrap text-ellipsis max-w-60 font-semibold text-center mx-auto">
          {{ store.user.email }}
        </p>
      </div>
    </template>
  </Modal>
</template>