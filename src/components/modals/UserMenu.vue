<script setup lang="ts">
import { useStore } from '../../store';
import Modal from './Modal.vue';

const store = useStore()
</script>

<template>
  <Modal direction="left">
    <template #body>
      <div class="mt-4">
        <p class="text-base text-nowrap text-ellipsis max-w-60 font-semibold text-center">
          {{ store.user.email }}
        </p>
      </div>
    </template>
  </Modal>
</template>