import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from '@/store/auth.module';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  }
})

//Para cambiar los estados
// this.$store.state.auth