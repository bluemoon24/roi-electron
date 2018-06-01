import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Chart from './views/Chart.vue'
import Data from './views/Data.vue'
import Page from './views/Page.vue'
import Builder from './views/Builder.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Home
    },
    {
      path: '/builder',
      name: 'builder',
      component: Builder
    },
    {
      path: '/chart',
      name: 'chart',
      component: Chart
    },
    {
      path: '/data',
      name: 'data',
      component: Data
    },
    {
      path: '/page',
      name: 'page',
      component: Page
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
