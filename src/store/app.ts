import { initializeApp } from 'firebase/app'
import { defineStore } from 'pinia'
import { config } from '../firebaseconfig'
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  type User as TypeUser 
} from 'firebase/auth'

const app = initializeApp(config)
const auth = getAuth(app)

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      showLoginModal: false,
      loginModalLoader: false,
      loginModalError: '',
      currentModal: 'login',
      registerModalError: '',
      registerModalLoader: false,
      user: {} as TypeUser,
      showUserMenu: false,
    }
  },
  actions: {
    toggleLoginModal() {
      this.showLoginModal = !this.showLoginModal
      this.loginModalError = ''
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    async submitLogin(email: string | undefined, pass: string | undefined) {
      if (!email || !pass) return null
      try {
        this.loginModalError = ''
        this.loginModalLoader = true
        const credentials = await signInWithEmailAndPassword(auth, email, pass)
        this.user = credentials.user
        this.toggleLoginModal()
      } catch (error: any) {
        if (error?.code === 'auth/invalid-credential') {
          this.loginModalError = 'Invalid credentials entered'
        }
      } finally {
        this.loginModalLoader = false
      }
    },
    async submitRegister(email: string | undefined, pass: string | undefined) {
      if (!email || !pass) return null
      try {
        this.registerModalLoader = true
        const credentials = await createUserWithEmailAndPassword(auth, email, pass)
        this.user = credentials.user
        // TODO: tratar mensagem de sucesso
      } catch (error: any) {
        // TODO: tratar erros
      } finally {
        this.registerModalLoader = false
        this.toggleLoginModal()
      }
    },
    toggleRegisterToLogin() {
      if (this.currentModal === 'register') {
        this.currentModal = 'login'
      } else {
        this.currentModal = 'register'
      }
    }
  }
})