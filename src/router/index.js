import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        authRequired: true,
      },
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../components/Home.vue'),
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: () => import('../components/Dashboard.vue'),
    },
    {
      path: '/LightOnePractice',
      name: 'LightOnePractice',
      component: () => import('../components/LightOnePractice.vue'),
    },
    {
      path: '/LightTwoPractice',
      name: 'LightTwoPractice',
      component: () => import('../components/LightTwoPractice.vue'),
    },
    {
      path: '/LightThreePractice',
      name: 'LightThreePractice',
      component: () => import('../components/LightThreePractice.vue'),
    },
    {
      path: '/MidiumOnePractice',
      name: 'MidiumOnePractice',
      component: () => import('../components/MidiumOnePractice.vue'),
    },
    {
      path: '/MidiumTwoPractice',
      name: 'MidiumTwoPractice',
      component: () => import('../components/MidiumTwoPractice.vue'),
    },
    {
      path: '/MidiumThreePractice',
      name: 'MidiumThreePractice',
      component: () => import('../components/MidiumThreePractice.vue'),
    },
    {
      path: '/HeavyOnePractice',
      name: 'HeavyOnePractice',
      component: () => import('../components/HeavyOnePractice.vue'),
    },
    {
      path: '/HeavyTwoPractice',
      name: 'HeavyTwoPractice',
      component: () => import('../components/HeavyTwoPractice.vue'),
    },
    {
      path: '/HeavyThreePractice',
      name: 'HeavyThreePractice',
      component: () => import('../components/HeavyThreePractice.vue'),
    },
    {
      path: '/LightOneTest',
      name: 'LightOneTest',
      component: () => import('../components/LightOneTest.vue'),
    },
    {
      path: '/BackHeavyOne',
      name: 'BackHeavyOne',
      component: () => import('../components/BackHeavyOne.vue'),
    },
    {
      path: '/BackHeavyTwo',
      name: 'BackHeavyTwo',
      component: () => import('../components/BackHeavyTwo.vue'),
    },
  ]
})
