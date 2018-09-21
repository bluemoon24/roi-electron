import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Chart from './views/Chart.vue'
import Data from './views/Data.vue'
import Page from './views/Page.vue'
import Configurator from './views/Configurator.vue'
import MSLayout from './views/MSLayout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Home
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
      path: '/configurator',
      name: 'configurator',
      component: Configurator
    },
    {
      path: '/mslayout',
      name: 'mslayout',
      component: MSLayout
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
