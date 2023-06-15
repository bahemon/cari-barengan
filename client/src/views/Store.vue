<script>
import StoreTable from '../components/StoreTable.vue';
export default {
  components: {
    StoreTable
  }
}
</script>

<template>
  <div class="w-full flex flex-col justify-start p-5">
    <div class="flex justify-end mb-2">
      <router-link to="/addStore">
        <button class="bg-blue-900 p-2 text-white rounded-lg">Add New Store</button>
      </router-link>
    </div>
    <StoreTable />
  </div>
</template>