<script >
import { mapActions, mapState } from 'pinia'
import { useIndexStore } from '../stores'
import ArticleTable from '../components/ArticleTable.vue'

export default {
  components: {
    ArticleTable
  }
}
</script>

<template>
  <div class="w-full flex flex-col justify-start p-5">
    <div class="flex justify-end mb-2">
      <router-link to="/addArticle">
        <button class="bg-blue-900 p-2 text-white rounded-lg">Post New Article</button>
      </router-link>
    </div>
    <ArticleTable />
  </div>
</template>
