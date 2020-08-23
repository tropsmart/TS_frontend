import Vue from 'vue'
import App from './App.vue'
import UserList from './components/UserList.Content.vue'
import Cargoes from './components/Cargoes.vue'
import Favorites from './components/Favorites.vue'
import Blockeds from './components/Blockeds.vue'
import Reviews from './components/Reviews.vue'
import router from './router'
import store from './store'
import * as VeeValidate from 'vee-validate';
import vuetify from './plugins/vuetify';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = true

library.add(faSpinner)

Vue.use(VeeValidate)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('UserList',UserList)
Vue.component('Cargoes',Cargoes)
Vue.component('Favorites',Favorites)
Vue.component('Blockeds',Blockeds)
Vue.component('Reviews',Reviews)

new Vue({
  router,
  store,
  vuetify,
  VeeValidate,
  render: h => h(App)
}).$mount('#app')
