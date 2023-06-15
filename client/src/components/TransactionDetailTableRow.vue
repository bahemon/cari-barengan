<script>
import toRupiah from '@develoka/angka-rupiah-js'


export default {
  props: ['detail', 'index'],
  methods: {
    convertToRupiah() {
      return toRupiah(this.detail.price)
    }
  }
}
</script>

<template>
  <tr>
    <th>{{ index + 1 }}</th>
    <td>{{ detail.Product.name }}</td>
    <td>{{ convertToRupiah() }}</td>
    <td>{{ detail.amount }}</td>
  </tr>
</template>