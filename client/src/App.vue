<script>
import { mapState, mapWritableState } from 'pinia';
import { RouterView } from 'vue-router'
import Drawer from './components/Drawer.vue'
import Navbar from './components/Navbar.vue'
import { useIndexStore } from './stores';

export default {
  created() {
    if (localStorage.access_token) {
      this.isLogin = true
    }
  },
  computed: {
    ...mapWritableState(useIndexStore, ['isLogin'])
  },
  components: {
    Navbar,
    Drawer
  }
}
</script>

<template>
  <Navbar v-if="isLogin" />
  <div class="flex">
    <div>
      <Drawer v-if="isLogin" />
    </div>
    <RouterView />
  </div>
</template>

<style></style>
