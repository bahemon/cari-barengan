<script>
import { mapActions } from 'pinia'
import { useIndexStore } from '../stores'

export default {
  props: ['article', 'index'],
  methods: {
    ...mapActions(useIndexStore, ['getArticleDetail'])
  }

}
</script>

<template>
  <tr>
    <th>{{ index + 1 }}</th>
    <td>{{ article.title }}</td>
    <td>
      <img :src="article.imageUrl" class="w-24 rounded-lg h-16 object-cover" alt="test">
    </td>
    <td>{{ article.User.email }}</td>
    <td>
      <router-link :to="'/article/' + article.id">
        <button class=" bg-blue-900 p-2 w-20 rounded-lg text-white">
          Detail
        </button>
      </router-link>
    </td>
  </tr>
</template>