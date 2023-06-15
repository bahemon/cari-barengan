<script>
import { mapActions, mapState } from 'pinia'
import { useIndexStore } from '../stores'

export default {
  data() {
    return {
      articleData: {
        title: '',
        imageUrl: '',
        description: ''
      },
      toEdit: false
    }

  },
  methods: {
    ...mapActions(useIndexStore, ['addArticle', 'getArticleDetail', 'editArticle']),
    submitHandler() {
      if (this.toEdit) {
        this.editArticle({ id: this.$route.params.id, articleData: this.articleData })
      } else {
        const formData = new FormData()
        formData.append('title', this.articleData.title)
        formData.append('imageUrl', this.articleData.imageUrl)
        formData.append('description', this.articleData.description)
        this.addArticle(formData)
      }
    },
    upload(e) {
      e.preventDefault()
      this.articleData.imageUrl = e.target.files[0]
    }
  },
  computed: {
    ...mapState(useIndexStore, ['article'])
  },
  async created() {
    if (this.$route.params.id) {
      this.toEdit = true
      await this.getArticleDetail(this.$route.params.id)
      this.articleData.title = this.article.title
      this.articleData.imageUrl = this.article.imageUrl
      this.articleData.description = this.article.description
    }
  }

}
</script>

<template>
  <div class="w-full flex justify-start">
    <div class="  p-5 flex flex-col gap-8 w-10/12">
      <h1 class="text-2xl font-bold">Input article details</h1>
      <div>
        <form @submit.prevent="submitHandler" class="w-96">
          <!-- Title -->
          <div class="flex flex-col justify-center mb-2 gap-2">
            <p>Title</p>
            <input v-model="articleData.title" type="text" placeholder="Article title"
              class="input input-bordered w-full max-w-xs" />
          </div>

          <!-- Image -->
          <div v-if="!toEdit" class="flex flex-col justify-center mb-2 gap-2">
            <p>Image</p>
            <input v-on:change="upload" type="file"
              class="file-input file-input-bordered file-input-sm w-full max-w-xs" />
          </div>

          <!-- Description -->
          <div class="flex flex-col justify-center mb-2 gap-2">
            <p>Description</p>
            <textarea v-model="articleData.description" class="textarea textarea-bordered"
              placeholder="Description"></textarea>
          </div>

          <div>
            <button class="bg-blue-900 p-2 rounded-lg text-white mt-5">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>