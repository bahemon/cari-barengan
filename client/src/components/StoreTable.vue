<script>
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from '../stores';
import StoreTableRow from './StoreTableRow.vue'


export default {
  components: {
    StoreTableRow
  },
  methods: {
    ...mapActions(useIndexStore, ['getStores']),

  },
  computed: {
    ...mapState(useIndexStore, ['stores'])
  },
  async created() {
    await this.getStores()
  }
}
</script>

<template>
  <div class="overflow-x-auto w-full">
    <table class="table w-full">
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Contact Person</th>
          <th>Location</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <StoreTableRow v-for="(store, index) in stores" :key="store.id" :store="store" :index="index" />
      </tbody>
    </table>
  </div>
</template>