<script>
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from '../stores';
import TransactionTableRow from './TransactionTableRow.vue';
export default {
  components: {
    TransactionTableRow
  },
  methods: {
    ...mapActions(useIndexStore, ['getTransactions']),

  },
  computed: {
    ...mapState(useIndexStore, ['transactions'])
  },
  created() {
    this.getTransactions()
  }
}
</script>

<template>
  <!-- <pre>{{ transactions }}</pre> -->
  <div class="overflow-x-auto w-full">
    <table class="table w-full">
      <thead>
        <tr>
          <th>No.</th>
          <th>Transaction Owner</th>
          <th>Store</th>
          <th>Total Fee</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <TransactionTableRow v-for="(transaction, index) in transactions" :key="transaction.id" :transaction="transaction"
          :index="index" />
      </tbody>
    </table>
  </div>
</template>