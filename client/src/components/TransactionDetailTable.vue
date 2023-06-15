<script>
import TransactionDetailTableRow from './TransactionDetailTableRow.vue';
export default {
  props: ['transaction'],
  components: {
    TransactionDetailTableRow
  }
}
</script>

<template>
  <div class="overflow-x-auto w-full">
    <table class="table w-full">
      <thead>
        <tr>
          <th>No.</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <TransactionDetailTableRow v-for="(detail, index) in transaction.TransactionDetails" :key="detail.id"
          :detail="detail" :index="index" />
      </tbody>
    </table>
  </div>
</template>