<script>
import { mapActions } from 'pinia'
import { useIndexStore } from '../stores';

export default {
  props: ['store', 'index'],
  methods: {
    ...mapActions(useIndexStore, ['getStoreDetail'])
  }
}
</script>

<template>
  <tr>
    <th>{{ index + 1 }}</th>
    <td>{{ store?.name }}</td>
    <td>
      <a href="https://api.whatsapp.com/send?phone=+6285314482330&text=Hello this is the starting message" target="_blank"
        class="bg-green-600 p-2 rounded-lg text-white">Chat on Whatsapp</a>
    </td>
    <td>{{ store?.Mountain?.name }}</td>
    <td>
      <router-link :to="'/store/' + store.id">
        <button class=" bg-blue-900 p-2 w-20 rounded-lg text-white">
          Detail
        </button>
      </router-link>
    </td>
  </tr>
</template>