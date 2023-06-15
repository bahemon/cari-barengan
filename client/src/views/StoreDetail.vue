<script>
import { mapActions, mapState } from 'pinia';
import StoreProductTable from '../components/StoreProductTable.vue';
import { useIndexStore } from '../stores';

export default {
  components: {
    StoreProductTable
  },
  methods: {
    ...mapActions(useIndexStore, ['getStoreDetail', 'deleteStore', 'getStoreProducts']),
    deleteHandler(id) {
      this.deleteStore(id)
    },
    dateFormat() {
      const newDate = new Date(this.store.createdAt).toISOString().substring(0, 10)
      return newDate
    }
  },
  computed: {
    ...mapState(useIndexStore, ['store', 'storeProduts'])
  },
  created() {
    this.getStoreDetail(this.$route.params.id)
  }
}
</script>

<template>
  <div class="w-full">
    <div class=" p-5 flex flex-col gap-5 w-11/12">
      <!-- Image -->
      <div>
        <img class="w-full h-52 object-cover rounded-2xl" :src="store?.Mountain?.imageUrl" alt="test">
      </div>

      <!-- Name -->
      <div class="text-2xl font-bold">
        <h1>{{ store?.name }}</h1>
      </div>

      <!-- Mointain Location -->
      <div>
        <div class="font-semibold">Moutain Location: </div>
        <h1>
          {{ store?.Mountain?.name }}
        </h1>
      </div>

      <!-- Address -->
      <div>
        <div class="font-semibold">Address: </div>
        <h1>
          {{ store?.address }}
        </h1>
      </div>

      <!-- CP -->
      <div class="gap-2 flex flex-col">
        <div class="font-semibold">Contact Person: </div>
        <div class="flex flex-col gap-1">
          <h1>
            {{ store?.contactPerson }}
          </h1>
          <a href="https://api.whatsapp.com/send?phone=+6285314482330&text=Hello this is the starting message"
            target="_blank" class="bg-green-600 p-1 rounded-lg text-white w-36 text-sm">Chat on Whatsapp</a>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <!-- Author -->
        <h1> <span class="font-semibold">Author: </span>{{ store?.User?.username }}</h1>
        <!-- Created At -->
        <h1> <span class="font-semibold">Created At: </span>{{ store.createdAt ? dateFormat() : '' }}</h1>
      </div>

      <!-- Action -->
      <div class="flex items-center gap-x-5 justify-end">
        <router-link :to="'/editStore/' + store?.id">
          <button class="bg-blue-500 p-2 w-20 rounded-lg text-white">Edit</button>
        </router-link>
        <button @click.prevent="deleteHandler(store?.id)"
          class="bg-red-500 p-2 w-20 rounded-lg text-white">Delete</button>
      </div>

      <!-- Product TABLEEEEEEE-->
      <div class="flex flex-col gap-5">
        <div class="flex justify-between mt-10">
          <h1 class="font-bold text-2xl">Product List</h1>
          <router-link :to="'/addProduct/' + this.$route.params.id">
            <button class="bg-blue-900 p-2 text-white rounded-lg">Add Product</button>
          </router-link>
        </div>
        <StoreProductTable />
      </div>


    </div>
  </div>
</template>