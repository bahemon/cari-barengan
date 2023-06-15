import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2'

export const useIndexStore = defineStore('index', {
  state: () => ({
    BASE_URL: 'http://localhost:3000',
    isLogin: false,
    mountains: [],
    articles: [],
    article: {},
    stores: [],
    store: {},
    storeProduts: [],
    storeProdut: {},
    categories: [],
    transactions: [],
    transaction: {}
  }),
  getters: {
    dateFormat() {
      const newDate = new Date(this.article.createdAt).toISOString().substring(0, 10)
      return newDate
    }
  },
  actions: {
    async login(loginData) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.BASE_URL + '/login',
          data: loginData
        })

        localStorage.setItem('id', data.id)
        localStorage.setItem('username', data.username)
        localStorage.setItem('email', data.email)
        localStorage.setItem('access_token', data.access_token)

        this.isLogin = true

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Welcome ${data.username}`,
          showConfirmButton: false,
          timer: 1500
        })

        this.router.push('/articles')
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
        console.log(err)
      }
    },
    async register(registerData) {
      try {
        await axios({
          method: 'POST',
          url: this.BASE_URL + '/register',
          headers: {
            access_token: localStorage.access_token
          },
          data: registerData
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Register success`,
          showConfirmButton: false,
          timer: 1500
        })

        this.router.push('/articles')
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      }
    },
    logout() {
      this.isLogin = false

      localStorage.removeItem('id')
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      localStorage.removeItem('access_token')

      this.router.push('/login')

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Goodbye!`,
        showConfirmButton: false,
        timer: 1500
      })
    },
    async getArticles() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.BASE_URL + '/articles',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.articles = data
      } catch (err) {
        console.log(err)
      }
    },
    async getArticleDetail(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.BASE_URL + '/articles/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })

        this.article = data

        // this.router.push('/article/' + id)
      } catch (err) {
        console.log(err)
      }
    },
    async addArticle(articleData) {
      try {
        articleData.append('AuthorId', localStorage.id)
        await axios({
          method: 'POST',
          url: this.BASE_URL + '/articles',
          headers: {
            access_token: localStorage.access_token,
            "Content-Type": "multipart/form-data"
          },
          data: articleData
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Article added to article list`,
          showConfirmButton: false,
          timer: 1500
        })

        this.router.push('/articles')
        this.getArticles()
      } catch (err) {
        console.log(err)
      }
    },
    async deleteArticle(id) {
      try {
        await axios({
          method: 'DELETE',
          url: this.BASE_URL + '/articles/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Article has been deleted`,
          showConfirmButton: false,
          timer: 1500
        })


        this.getArticles()
        this.router.push('/articles')

      } catch (err) {
        console.log(err)
      }
    },
    async editArticle({ id, articleData }) {
      try {
        await axios({
          method: 'PUT',
          url: this.BASE_URL + '/articles/' + id,
          headers: {
            access_token: localStorage.access_token
          },
          data: articleData
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Article updated`,
          showConfirmButton: false,
          timer: 1500
        })

        this.router.push('/articles')
        this.getArticles()
      } catch (err) {
        console.log(err)
      }
    },
    async getMountains() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.BASE_URL + '/mountains',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.mountains = data
      } catch (err) {
        console.log(err)

      }
    },
    async getStores() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.BASE_URL + '/stores',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.stores = data
      } catch (err) {
        console.log(err)
      }
    },
    async addStore(storeData) {
      try {
        await axios({
          method: 'POST',
          url: this.BASE_URL + '/stores',
          headers: {
            access_token: localStorage.access_token
          },
          data: storeData
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `New store added to store list`,
          showConfirmButton: false,
          timer: 1500
        })

        this.getStores()
        this.router.push('/stores')
      } catch (err) {
        console.log(err)
      }
    },
    async getStoreDetail(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.BASE_URL + '/stores/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.store = data
      } catch (err) {
        console.log(err)
      }
    },
    async deleteStore(id) {
      try {
        await axios({
          method: 'DELETE',
          url: this.BASE_URL + '/stores/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Store has been deleted`,
          showConfirmButton: false,
          timer: 1500
        })


        this.getStores()
        this.router.push('/stores')

      } catch (err) {
        console.log(err)
      }
    },
    async editStore({ id, storeData }) {
      try {
        const { data } = await axios({
          method: 'PUT',
          url: this.BASE_URL + '/stores/' + id,
          headers: {
            access_token: localStorage.access_token
          },
          data: storeData
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Store updated`,
          showConfirmButton: false,
          timer: 1500
        })

        this.router.push('/stores')
        this.getStores()
      } catch (err) {
        console.log(err)
      }
    },
    async addStoreProducts({ productData, StoreId }) {
      try {
        // console.log(StoreId, 'STORE ID<<<<<<<', productData)
        productData.append('StoreId', StoreId)
        await axios({
          method: 'POST',
          url: this.BASE_URL + '/products',
          headers: {
            access_token: localStorage.access_token
          },
          data: productData
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `New product added to product list`,
          showConfirmButton: false,
          timer: 1500
        })

        this.router.push('/store/' + StoreId)
        this.getStoreProducts(StoreId)
      } catch (err) {
        console.log(err)
      }
    },
    async getStoreProducts(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.BASE_URL + '/products/stores/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })

        this.storeProduts = data
      } catch (err) {
        console.log(err)

      }
    },
    async getStoreProductDetail(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.BASE_URL + '/products/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.storeProdut = data
      } catch (err) {
        console.log(err)
      }
    },
    async updateStoreProduct({ id, productData, StoreId }) {
      try {
        await axios({
          method: 'PUT',
          url: this.BASE_URL + '/products/' + id,
          headers: {
            access_token: localStorage.access_token
          },
          data: productData
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Product updated`,
          showConfirmButton: false,
          timer: 1500
        })

        // console.log(id, StoreId)
        this.router.push('/store/' + StoreId)
        this.getStoreProducts(StoreId)
      } catch (err) {
        console.log(err)
      }
    },
    async updateProductStatus({ id, isAvailable }) {
      try {
        const { data } = await axios({
          method: 'PATCH',
          url: this.BASE_URL + '/products/' + id,
          headers: {
            access_token: localStorage.access_token
          },
          data: { isAvailable }
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Product status updated`,
          showConfirmButton: false,
          timer: 1500
        })

      } catch (err) {
        console.log(err)
      }
    },
    async deleteStoreProduct({ id, StoreId }) {
      try {
        await axios({
          method: 'DELETE',
          url: this.BASE_URL + '/products/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Product has been deleted`,
          showConfirmButton: false,
          timer: 1500
        })
        console.log(StoreId, "/////////////")
        await this.getStoreProducts(StoreId)
      } catch (err) {
        console.log(err)

      }
    },
    async getCategories() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.BASE_URL + '/categories',
          headers: {
            access_token: localStorage.access_token
          }
        })

        this.categories = data
      } catch (err) {
        console.log(err)
      }
    },
    async getTransactions() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.BASE_URL + '/transactions',
          headers: {
            access_token: localStorage.access_token
          }
        })

        this.transactions = data
      } catch (err) {
        console.log(err)

      }
    },
    async getTransactionDetail(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.BASE_URL + '/transactions/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })

        this.transaction = data

      } catch (err) {
        console.log(err)

      }
    },
    async updateTransactionStatus({ id, status }) {
      try {
        const { data } = await axios({
          method: 'PATCH',
          url: this.BASE_URL + '/transactions/' + id,
          headers: {
            access_token: localStorage.access_token
          },
          data: { status }
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Transaction status updated`,
          showConfirmButton: false,
          timer: 1500
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
})