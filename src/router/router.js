import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/'
// import Ava from '../views/wallet/Ava.vue'
// import Transfer from '@/components/wallet/Transfer.vue'
// import Assets from '../views/wallet/Assets.vue';
// import History from '../views/wallet/History.vue'
import Transfer from '@/components/transfer/transfer.vue'
// import Advanced from '@/components/wallet/advanced/Advanced.vue'
import ManageKeys from '@/components/wallet/keys/ManageKeys.vue'
import WalletHome from '@/components/wallet/home.vue'

Vue.use(VueRouter)

import store from '../store/index' // your vuex store

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.isAuth) {
    next()
    return
  }
  next('/wallet')
}

const ifAuthenticated = (to, from, next) => {
  if (store.state.isAuth) {
    next()
    return
  }
  next('/')
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/access',
    children: [
      {
        path: '/',
        name: 'access',
        component: () => import(/* webpackChunkName: "access_pk" */ '@/components/access/Menu.vue')
      },
      {
        path: 'private_key',
        component: () => import(/* webpackChunkName: "access_pk" */ '@/components/access/AccessString.vue')
      },
      {
        path: 'keystore',
        component: () => import(/* webpackChunkName: "access_file" */ '@/components/access/KeyStore.vue')
      }
    ],
    component: () => import(/* webpackChunkName: "about" */ '@/components/access/Access.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/create',
    name: 'create',
    component: () => import(/* webpackChunkName: "about" */ '@/components/create/create.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/wallet',
    children: [
      {
        path: '/',
        name: 'wallet',
        component: WalletHome
      },
      {
        path: 'transfer',
        component: Transfer
      },
      {
        path: 'keys',
        component: ManageKeys
      }
      // {
      //   path: 'advanced',
      //   component: Advanced
      // }
    ],
    component: () => import(/* webpackChunkName: "login" */ '@/components/wallet/wallet.vue'),
    beforeEnter: ifAuthenticated
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
