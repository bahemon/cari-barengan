<script>
import { mapActions } from 'pinia';
import router from '../router';
import { useIndexStore } from '../stores';

export default {
  data() {
    return {
      isAvailable: ''
    }
  },
  props: ['product', 'index'],
  methods: {
    ...mapActions(useIndexStore, ['deleteStoreProduct', 'getStoreProducts', 'updateProductStatus', 'getStoreProductDetail']),
    formattedPrice() {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(this.product.price)
    },
    deleteHandler(id) {
      this.deleteStoreProduct({ id, StoreId: this.$route.params.StoreId })
    },
    onChange(event, id) {
      const isTest = event.target.value === "true" ? true : false
      this.isAvailable = isTest
      this.updateProductStatus({ id, isAvailable: this.isAvailable })
    }
  },
  async created() {
    await this.getStoreProducts(this.$route.params.id)
    this.isAvailable = this.product.isAvailable
  }
}
</script>

<template>
  <tr>

    <th>{{ index + 1 }}</th>
    <td>{{ product?.name }}</td>
    <td>
      {{ product?.stock }}
    </td>
    <td>
      <img :src="product?.imageUrl" alt="">
    </td>
    <td>
      {{ product.price ? formattedPrice() : '' }}
    </td>
    <td>
      {{ product?.Category.name }}
    </td>
    <td>
      <select @change="(event) => onChange(event, product.id)" v-model="isAvailable" class="select select-bordered w-40">
        <option :value='true' :selected="product.isAvailable">Available</option>
        <option :value='false' :selected="!product.isAvailable">Out of stock</option>
      </select>
    </td>
    <td>
      <div class="flex gap-2">
        <router-link :to="'/editProduct/' + product?.id">
          <button class="bg-blue-500 p-2 w-20 rounded-lg text-white">Edit</button>
        </router-link>
        <button @click.prevent="deleteHandler(product?.id)"
          class="bg-red-500 p-2 w-20 rounded-lg text-white">Delete</button>
      </div>
    </td>

  </tr>
</template>