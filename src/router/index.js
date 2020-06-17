import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SideMenu from '../components/SideMenu.vue'
import MainMenu from '../components/MainMenu.vue'
import UsersContent from '../components/UsersContent.vue'
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/side',
    name: 'SideMenu',
    component: SideMenu
  },
  {
    path: '/profile',
    name: 'MainMenu',
    component: MainMenu
  },
  {
    path: '/users',
    name: 'UsersContent',
    component: UsersContent
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/about',
    name: 'About',

    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
