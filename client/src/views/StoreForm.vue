<script>
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from '../stores';

export default {
  data() {
    return {
      storeData: {
        name: '',
        address: '',
        contactPerson: '',
        MountainId: 0
      },
      toEdit: false
    }
  },
  methods: {
    ...mapActions(useIndexStore, ['addStore', 'getMountains', 'getStoreDetail', 'editStore']),
    submitHandler() {
      if (this.toEdit) {
        this.editStore({ id: this.$route.params.id, storeData: this.storeData })
      } else {
        this.addStore(this.storeData)
      }
    }
  },
  computed: {
    ...mapState(useIndexStore, ['mountains', 'store'])
  },
  async created() {
    this.getMountains()
    if (this.$route.params.id) {
      await this.getStoreDetail(this.$route.params.id)
      this.toEdit = true
      this.storeData.name = this.store.name
      this.storeData.address = this.store.address
      this.storeData.contactPerson = this.store.contactPerson
      this.storeData.MountainId = this.store.MountainId
    }
  }
}
</script>

<template>
  <div class="w-full flex justify-start">
    <div class="p-5 flex flex-col gap-8 w-10/12">
      <h1 class="text-2xl font-bold">Input Store Detail</h1>
      <div>
        <form @submit.prevent="submitHandler" class="w-96">
          <!-- Name -->
          <div class="flex flex-col justify-center mb-2 gap-2">
            <p>Name</p>
            <input v-model="storeData.name" type="text" placeholder="Store name"
              class="input input-bordered w-full max-w-xs" />
          </div>

          <!-- Address -->
          <div class="flex flex-col justify-center mb-2 gap-2">
            <p>Address</p>
            <input v-model="storeData.address" type="text" placeholder="Store Address"
              class="input input-bordered w-full max-w-xs" />
          </div>

          <!-- Contact Person -->
          <div class="flex flex-col justify-center mb-2 gap-2">
            <p>Contact Person</p>
            <input v-model="storeData.contactPerson" type="number" placeholder="Contact Person"
              class="input input-bordered w-full max-w-xs" />
          </div>

          <!-- Mountain -->
          <div v-if="!toEdit" class="flex flex-col justify-center mb-2 gap-2">
            <p>Mountain Location</p>
            <select v-model="storeData.MountainId" class="select select-bordered w-full max-w-xs">
              <option disabled selected>Choose</option>
              <option v-for="mountain in mountains" :key="mountain?.id" :value="mountain?.id">{{ mountain?.name }}
              </option>
            </select>
          </div>

          <div>
            <button class="bg-blue-900 p-2 rounded-lg text-white mt-5">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>