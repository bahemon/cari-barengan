<script>
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from '../stores';
import TransactionDetailTable from '../components/TransactionDetailTable.vue';
import toRupiah from '@develoka/angka-rupiah-js';

export default {
  data() {
    return {
      status: ''
    }
  },
  components: {
    TransactionDetailTable
  },
  methods: {
    ...mapActions(useIndexStore, ['getTransactionDetail', 'updateTransactionStatus']),
    onChange(event, id) {
      this.updateTransactionStatus({ id, status: this.status })
    },
    startDate() {
      const newDate = new Date(this.transaction.startToRent).toISOString().substring(0, 10)
      return newDate
    },
    finishDate() {
      const newDate = new Date(this.transaction.finishToRent).toISOString().substring(0, 10)
      return newDate
    },
    convertToRupiah() {
      return toRupiah(this.transaction.totalFee)
    }
  },
  computed: {
    ...mapState(useIndexStore, ['transaction'])
  },
  async created() {
    await this.getTransactionDetail(this.$route.params.id)
    this.status = this.transaction.status
  }
}
</script>

<template>
  <div class="w-full">
    <div class=" p-5 flex flex-col gap-5 w-10/12">

      <div class="flex justify-between">
        <div class="flex flex-col gap-3">
          <!-- Transaction Owner -->
          <div>
            <p class="font-semibold">Transaction Owner:</p>
            <p>{{ transaction?.User?.Profile?.fullName }}</p>
          </div>

          <!-- Owner CP -->
          <div class="gap-2 flex flex-col">
            <div class="font-semibold">Contact Person: </div>
            <div class="flex flex-col gap-1">
              <h1>
                +6285885939426
              </h1>
              <a href="https://api.whatsapp.com/send?phone=+6285314482330&text=Hello this is the starting message"
                target="_blank" class="bg-green-600 p-1 rounded-lg text-white w-36 text-sm">Chat on Whatsapp</a>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <!-- Store Name -->
          <div>
            <p class="font-semibold">Store:</p>
            <p>{{ transaction.TransactionDetails ? transaction.TransactionDetails[0].Store.name : '' }}</p>
          </div>
          <!-- Rent Date -->
          <div>
            <p><span class="font-semibold">Start To Rent: </span>{{ transaction?.startToRent ? startDate() : '' }}</p>
            <p><span class="font-semibold">Finish To Rent: </span>{{ transaction?.finishToRent ? finishDate() : '' }}</p>
          </div>

          <!-- Total Fee -->
          <div>
            <p><span class="font-semibold">Total Fee:</span> {{ convertToRupiah() }}</p>
          </div>

          <!-- Status -->
          <div class="flex flex-col gap-2">
            <p class="font-semibold">Status:</p>
            <select :disabled="transaction.status === 'Done'" @change="(event) => onChange(event, transaction.id)"
              v-model="status" class="select select-bordered w-52">
              <option :value="'Pending'" :selected="transaction.status === 'Pending'">Pending</option>
              <option :value="'Paid'" :selected="transaction.status === 'Paid'">Paid</option>
              <option :value="'Done'" :selected="transaction.status === 'Done'">Done</option>
              <option :value="'Canceled'" :selected="transaction.status === 'Canceled'">Canceled</option>
            </select>
          </div>

        </div>
      </div>

      <!-- Transaction List -->
      <div>
        <h1 class="text-2xl font-bold">Transaction List</h1>
        <TransactionDetailTable :transaction="transaction" />
      </div>

    </div>
  </div>
</template>