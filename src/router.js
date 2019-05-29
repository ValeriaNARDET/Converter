import Vue from 'vue'
import Router from 'vue-router'

import Converter from './components/Converter'
import Currency from './components/Currency'
import Result from './components/Result'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'converter',
      component: Converter,
      props: true
    },
    {
      path: '/operation',
      name: 'currency',
      component: Currency,
      props: true
    },
    {
      path: '/result',
      name: 'result',
      component: Result,
      props: true
    }
  ]
})
