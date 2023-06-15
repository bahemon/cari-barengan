<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useIndexStore } from '../stores'

export default {
  methods: {
    ...mapActions(useIndexStore, ['logout']),
    logoutHandle() {
      this.logout()

    }
  },
  computed: {
    ...mapState(useIndexStore, ['isLogin'])
  },
  mounted() {
    // console.log(this.isLogin, "<<<<<<<<<")

  }
}
</script>

<template>
  <div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    </div>

    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-60 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <router-link to="/articles">
          <li><a>Article List</a></li>
        </router-link>
        <router-link to="/stores">
          <li><a>Store List</a></li>
        </router-link>
        <router-link to="/transactions">
          <li><a>Transaction List</a></li>
        </router-link>
        <router-link to="/register">
          <li><a>Register New Admin</a></li>
        </router-link>

        <li><a @click.prevent="logoutHandle">Logout</a></li>
      </ul>

    </div>
  </div>
</template>