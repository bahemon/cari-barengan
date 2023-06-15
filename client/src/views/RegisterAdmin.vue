<script>
import { mapActions } from 'pinia';
import { useIndexStore } from '../stores';

export default {
  data() {
    return {
      registerData: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useIndexStore, ['register']),
    submitHandler() {
      this.register(this.registerData)
    }
  }
}
</script>

<template>
  <div class="w-full flex justify-start">
    <div class="p-5 flex flex-col gap-8 w-10/12">
      <h1 class="text-2xl font-bold">Input Admin Detail</h1>
      <div>
        <form @submit.prevent="submitHandler" class="w-96">
          <!-- username -->
          <div class="flex flex-col justify-center mb-2 gap-2">
            <p>Username</p>
            <input v-model="registerData.username" type="text" placeholder="Username"
              class="input input-bordered w-full max-w-xs" />
          </div>

          <!-- Email -->
          <div class="flex flex-col justify-center mb-2 gap-2">
            <p>Email</p>
            <input v-model="registerData.email" type="text" placeholder="Email"
              class="input input-bordered w-full max-w-xs" />
          </div>

          <!-- Password -->
          <div class="flex flex-col justify-center mb-2 gap-2">
            <p>Password</p>
            <input v-model="registerData.password" type="password" placeholder="Password"
              class="input input-bordered w-full max-w-xs" />
          </div>

          <div>
            <button class="bg-blue-900 p-2 rounded-lg text-white mt-5">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>