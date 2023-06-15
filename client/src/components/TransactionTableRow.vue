<script>
import { mapActions } from 'pinia';
import { useIndexStore } from '../stores';
import toRupiah from '@develoka/angka-rupiah-js';

export default {
  props: ['transaction', 'index'],
  methods: {
    ...mapActions(useIndexStore, ['getTransactionDetail']),
    convertToRupiah() {
      return toRupiah(this.transaction.totalFee)
    }
  }
}
</script>

<template>
  <tr>
    <th>{{ index + 1 }}</th>
    <td>{{ transaction.User.username }}</td>
    <td>{{ transaction.TransactionDetails[0].Store.name }}</td>
    <td>{{ convertToRupiah() }}</td>
    <td>{{ transaction.status }}</td>
    <td>
      <router-link :to="'/transaction/' + transaction.id">
        <button class=" bg-blue-900 p-2 w-20 rounded-lg text-white">
          Detail
        </button>
      </router-link>
    </td>
  </tr>
</template>