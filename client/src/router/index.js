import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Article from '../views/Article.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import ArticleForm from '../views/ArticleForm.vue'
import Store from '../views/Store.vue'
import StoreDetail from '../views/StoreDetail.vue'
import StoreForm from '../views/StoreForm.vue'
import ProductForm from '../views/ProductForm.vue'
import Transaction from '../views/Transaction.vue'
import TransactionDetail from '../views/TransactionDetail.vue'
import RegisterAdmin from '../views/RegisterAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterAdmin
    },
    {
      path: '/articles',
      name: 'articles',
      component: Article
    },
    {
      path: '/article/:id',
      name: 'articleDetail',
      component: ArticleDetail
    },
    {
      path: '/addArticle',
      name: 'addArticle',
      component: ArticleForm
    },
    {
      path: '/editArticle/:id',
      name: 'editArticle',
      component: ArticleForm
    },
    {
      path: '/stores',
      name: 'stores',
      component: Store
    },
    {
      path: '/store/:id',
      name: 'storeDetail',
      component: StoreDetail
    },
    {
      path: '/addStore',
      name: 'addStore',
      component: StoreForm
    },
    {
      path: '/editStore/:id',
      name: 'editStore',
      component: StoreForm
    },
    {
      path: '/addProduct/:StoreId',
      name: 'addProduct',
      component: ProductForm
    },
    {
      path: '/editProduct/:id',
      name: 'editProduct',
      component: ProductForm
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transaction
    },
    {
      path: '/transaction/:id',
      name: 'transactionDetail',
      component: TransactionDetail
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'NotFound',
    //   component: NotFound
    // },
  ]
})

router.beforeEach((to, from) => {
  if (!localStorage.access_token) {
    if (to.name !== 'login') return { name: 'login' }
  } else {
    if (to.name === 'login') return { name: 'articles' }
  }

})

export default router
