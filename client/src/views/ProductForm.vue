<script>
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from '../stores';

export default {
  data() {
    return {
      productData: {
        name: '',
        imageUrl: '',
        stock: 0,
        price: 0,
        CategoryId: 0,
        StoreId: this.$route.params.id
      },
      toEdit: false
    }
  },
  methods: {
    ...mapActions(useIndexStore, ['getCategories', 'addStoreProducts', 'getStoreProductDetail', 'updateStoreProduct']),
    submitHandler() {
      if (this.toEdit) {
        this.updateStoreProduct({ id: this.$route.params.id, productData: this.productData, StoreId: this.storeProdut.Store.id })
      } else {
        const formData = new FormData()
        formData.append('name', this.productData.name)
        formData.append('imageUrl', this.productData.imageUrl)
        formData.append('stock', this.productData.stock)
        formData.append('price', this.productData.price)
        formData.append('CategoryId', this.productData.CategoryId)

        this.addStoreProducts({ productData: formData, StoreId: this.$route.params.StoreId })
      }
    },
    upload(e) {
      e.preventDefault()
      this.productData.imageUrl = e.target.files[0]
    }
  },
  computed: {
    ...mapState(useIndexStore, ['categories', 'storeProdut'])
  },
  async created() {
    this.getCategories()
    if (this.$route.params.id) {
      this.toEdit = true
      await this.getStoreProductDetail(this.$route.params.id)
      this.productData.name = this.storeProdut.name
      this.productData.stock = this.storeProdut.stock
      this.productData.price = this.storeProdut.price
    }
  }
}
</script>

<template>
  <!-- <pre>{{ storeProdut }}</pre>/ -->
  <div class="w-full flex justify-start">
    <div class="  p-5 flex flex-col gap-8 w-10/12">
      <h1 class="text-2xl font-bold">Input product detail</h1>
      <div class="flex ml-6">
        <div>
          <form @submit.prevent="submitHandler" class="w-96">
            <!-- Name -->
            <div class="flex flex-col justify-center mb-2 gap-2">
              <p>Name</p>
              <input v-model="productData.name" type="text" placeholder="Product Name"
                class="input input-bordered w-full max-w-xs" />
            </div>

            <!-- Image -->
            <div v-if="!toEdit" class="flex flex-col justify-center mb-2 gap-2">
              <p>Image</p>
              <input v-on:change="upload" type="file"
                class="file-input file-input-bordered file-input-sm w-full max-w-xs" />
            </div>

            <!-- Stock -->
            <div class="flex flex-col justify-center mb-2 gap-2">
              <p>Stock</p>
              <input v-model="productData.stock" type="number" placeholder="Product Stock"
                class="input input-bordered w-full max-w-xs" />
            </div>

            <!-- Price -->
            <div class="flex flex-col justify-center mb-2 gap-2">
              <p>Price</p>
              <input v-model="productData.price" type="number" placeholder="Product Price"
                class="input input-bordered w-full max-w-xs" />
            </div>

            <!-- Category -->
            <div v-if="!toEdit" class="flex flex-col justify-center mb-2 gap-2">
              <p>Category</p>
              <select v-model="productData.CategoryId" class="select select-bordered w-full max-w-xs">
                <option disabled selected>Choose</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
                </option>
              </select>
            </div>

            <div>
              <button class="bg-blue-900 p-2 rounded-lg text-white mt-5">Submit</button>
            </div>
          </form>
        </div>
        <div v-if="toEdit">
          <img class="w-72 h-72 object-cover rounded-2xl shadow-2xl" :src="storeProdut.imageUrl" alt="">
        </div>
      </div>
    </div>
  </div>
</template>