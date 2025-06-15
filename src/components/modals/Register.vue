<script setup lang="ts">
import { useTemplateRef } from 'vue'
import IconLoader from '/icon-loader.svg'
import Modal from './Modal.vue'
import { useAppStore } from '../../store/app'

const store = useAppStore()
const emailLogin = useTemplateRef('email-input')
const passLogin = useTemplateRef('pass-input')
const passRegister = useTemplateRef('pass-input-register')
const emailRegister = useTemplateRef('email-input-register')
</script>

<template>
  <Modal @close="store.toggleLoginModal()">
    <template #header>
      <h2 class="text-2xl font-semibold">
        <template v-if="store.currentModal === 'login'">
          Login
        </template>
        <template v-else>
          Register
        </template>
      </h2>
    </template>
    <template #body>
      <template v-if="store.currentModal === 'login'">
        <p class="text-sm text-red-500 text-center font-semibold mt-6 min-h-5">{{ store.loginModalError }}</p>
        <form @submit.prevent="store.submitLogin(emailLogin?.value, passLogin?.value)" class="flex flex-col gap-2 mt-4 md:max-w-96 md:mx-auto">
          <label for="email">
            <span class="input-label">Email:</span>
            <input type="email" id="email" name="email" class="input-default" ref="email-input" placeholder="example@example.com" required />
          </label>
          <label for="password">
            <span class="input-label">Password:</span>
            <input type="password" id="password" name="password" class="input-default" ref="pass-input" required />
          </label>
          <button type="submit" class="button-default mt-6 flex items-center justify-center gap-2">
            <template v-if="store.loginModalLoader">
              <img :src="IconLoader" alt="loading" class="rotating" />
            </template>
            <template v-else>
              Enter
            </template>
          </button>
          <button type="button" class="button-link" @click="store.toggleRegisterToLogin()">
            Sign up
          </button>
        </form>
      </template>
      <template v-if="store.currentModal === 'register'">
        <p class="text-sm text-red-500 text-center font-semibold mt-6 min-h-5">{{ store.registerModalError }}</p>
        <form @submit.prevent="store.submitRegister(emailRegister?.value, passRegister?.value)" class="flex flex-col gap-2 mt-4 md:max-w-96 md:mx-auto">
          <label for="email-register">
            <span class="input-label">Email:</span>
            <input type="email" id="email-register" name="email-register" class="input-default" ref="email-input-register" placeholder="example@example.com" required />
          </label>
          <label for="password-register">
            <span class="input-label">Password:</span>
            <input type="password" id="password-register" name="password-register" class="input-default" ref="pass-input-register" required />
          </label>
          <button type="submit" class="button-default mt-6 flex items-center justify-center gap-2">
            <template v-if="store.registerModalLoader">
              <img :src="IconLoader" alt="loading" class="rotating" />
            </template>
            <template v-else>
              Register
            </template>
          </button>
          <button type="button" class="button-link" @click="store.toggleRegisterToLogin()">
            Sign In
          </button>
        </form>
      </template>
    </template>
  </Modal>
</template>