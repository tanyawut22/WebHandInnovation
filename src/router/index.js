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
      path: '/HomeAdmin',
      name: 'HomeAdmin',
      component: () => import('../components/HomeAdmin.vue'),
    },
    {
      path: '/PracticeMode',
      name: 'PracticeMode',
      component: () => import('../components/PracticeHistory.vue'),
    },
    {
      path: '/TestMode',
      name: 'TestMode',
      component: () => import('../components/TestHistory.vue'),
    },
    {
      path: '/UserPracticeHistory',
      name: 'UserPracticeHistory',
      component: () => import('../components/UserPracticeHistory.vue'),
    },
    {
      path: '/UserTestHistory',
      name: 'UserTestHistory',
      component: () => import('../components/UserTestHistory.vue'),
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
      path: '/LightOneTest',
      name: 'LightOneTest',
      component: () => import('../components/LightOneTest.vue'),
    },
    {
      path: '/LightTwoTest',
      name: 'LightTwoTest',
      component: () => import('../components/LightTwoTest.vue'),
    },
    {
      path: '/MidiumOneTest',
      name: 'MidiumOneTest',
      component: () => import('../components/MidiumOneTest.vue'),
    },
    {
      path: '/MidiumTwoTest',
      name: 'MidiumTwoTest',
      component: () => import('../components/MidiumTwoTest.vue'),
    },
    {
      path: '/HeavyOneTest',
      name: 'HeavyOneTest',
      component: () => import('../components/HeavyOneTest.vue'),
    },
    {
      path: '/HeavyTwoTest',
      name: 'HeavyTwoTest',
      component: () => import('../components/HeavyTwoTest.vue'),
    },

  ]
})
