<script>
import { mapActions, mapState } from 'pinia'
import { useIndexStore } from '../stores'
import ArticleTableRow from './ArticleTableRow.vue'

export default {
  components: {
    ArticleTableRow
  },
  methods: {
    ...mapActions(useIndexStore, ['getArticles'])
  },
  computed: {
    ...mapState(useIndexStore, ['articles'])
  },
  created() {
    this.getArticles()
  }
}
</script>

<template>
  <div class="overflow-x-auto w-full">
    <table class="table w-full">
      <thead>
        <tr>
          <th>No.</th>
          <th>Title</th>
          <th>Image</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

        <ArticleTableRow v-for="(article, index) in articles" :key="index" :article="article" :index="index" />

      </tbody>
    </table>
  </div>
</template>
