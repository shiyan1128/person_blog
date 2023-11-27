import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Details from '@/views/Details/index.vue'
import Personal from '@/views/Personal/index.vue'
import FirstPage from '@/views/Home/component/FirstPage.vue'
import fuEdit from '@/views/Details/fuEdit.vue'
import playground from '@/views/Personal/playground.vue'
import oneself from '@/views/Personal/oneself.vue'
import ArticleManage from '@/views/Personal/ArticleManage.vue'
import musicList from '@/views/Personal/musicList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'firstpage',
          component: FirstPage
        },
        {
          path: '/details/:id',
          name: 'details',
          component: Details
          // children: [
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: fuEdit
        }
      ]
    },
    {
      path: '/personal',
      name: 'personal',
      redirect: '/personal/oneself',
      component: Personal,
      children: [
        {
          path: 'playground',
          name: 'playground',
          component: playground
        },
        {
          path: 'oneself',
          name: 'oneself',
          component: oneself
        },
        {
          path: 'article',
          name: 'article',
          component: ArticleManage
        },
        {
          path: 'musicList',
          name: 'musicList',
          component: musicList
        }
      ]
    }
  ]
})

export default router
