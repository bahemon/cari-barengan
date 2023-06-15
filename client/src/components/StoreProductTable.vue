<script>
import StoreProductTableRow from './StoreProductTableRow.vue'
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from '../stores';

export default {
  components: {
    StoreProductTableRow
  },
  methods: {
    ...mapActions(useIndexStore, ['getStoreProducts']),
  },
  computed: {
    ...mapState(useIndexStore, ['storeProduts'])
  },
  created() {
    this.getStoreProducts(this.$route.params.id)
  }
}
</script>

<template>
  <div class="overflow-x-auto w-full">
    <div v-if="storeProduts.length === 0" class="w-full flex justify-center border-2 rounded-3xl p-10">
      <p class="text-3xl font-bold">This store don't have any product yet...</p>
    </div>
    <table v-else class="table w-full">
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Stock</th>
          <th>Image</th>
          <th>Price</th>
          <th>Category</th>
          <th>Is Available</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <StoreProductTableRow v-for="(product, index) in storeProduts" :key="product.id" :product="product"
          :index="index" />
      </tbody>
    </table>
  </div>
</template>