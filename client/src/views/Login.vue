<script>
import { mapActions } from 'pinia'
import { useIndexStore } from '../stores';

export default {
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useIndexStore, ['login']),
    loginHandle() {
      // console.log(this.loginData, "<<<<<<")
      this.login(this.loginData)
    }
  },
  computed: {

  }
}
</script>


<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="flex flex-row w-9/12 justify-center gap-5">
      <div class="w-72">
        <img src="../assets/cari-barengan.png" alt="">
      </div>
      <div class="w-96 flex justify-center items-center">
        <form @submit.prevent="loginHandle" class="flex flex-col gap-10 justify-center items-center">
          <div class="w-80">
            <div class="flex items-center mb-2 gap-2">
              <span class="material-symbols-outlined">
                mail
              </span>
              Email Address
            </div>
            <input v-model="loginData.email" type="text" placeholder="Enter your email"
              class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="w-80">
            <div class="flex items-center mb-2 gap-2">
              <span class="material-symbols-outlined">
                lock
              </span>
              Password
            </div>
            <input v-model="loginData.password" type="password" placeholder="Enter your password"
              class="input input-bordered w-full max-w-xs" />
          </div>
          <button class="w-32 bg-blue-900 p-2 rounded-lg text-white ">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>