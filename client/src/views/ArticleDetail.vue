<script>
import { mapActions, mapState } from 'pinia'
import { useIndexStore } from '../stores'

export default {
  computed: {
    ...mapState(useIndexStore, ['article'])
  },
  methods: {
    ...mapActions(useIndexStore, ['getArticleDetail', 'deleteArticle']),
    deleteHandler(id) {
      this.deleteArticle(id)
    },
    dateFormat() {
      const newDate = new Date(this.article.createdAt).toISOString().substring(0, 10)
      return newDate
    }
  },
  created() {
    this.getArticleDetail(this.$route.params.id)
  }
}

</script>

<template>
  <div class="w-full">
    <div class=" p-5 flex flex-col gap-8 w-10/12">
      <!-- Image -->
      <div>
        <img class="w-full h-52 object-cover rounded-2xl" :src="article.imageUrl" :alt="article.title">
      </div>

      <!-- Title -->
      <div class="text-2xl font-bold">
        <h1>{{ article.title }}</h1>
      </div>

      <div class="flex flex-col gap-1">
        <!-- Author -->
        <h1> <span class="font-semibold">Author: </span> {{ article.User?.email }}</h1>
        <!-- Created At -->
        <h1> <span class="font-semibold">Created At: </span>{{ article.createdAt ? dateFormat() : '' }}</h1>
      </div>

      <!-- Description -->
      <div class="text-justify">
        <h1>{{ article.description }}</h1>
      </div>

      <!-- Action -->
      <div class="flex items-center gap-x-5 justify-end">
        <router-link :to="'/editArticle/' + article.id">
          <button class="bg-blue-500 p-2 w-20 rounded-lg text-white">Edit</button>
        </router-link>
        <button @click.prevent="deleteHandler(article.id)"
          class="bg-red-500 p-2 w-20 rounded-lg text-white">Delete</button>
      </div>
    </div>
  </div>
</template>