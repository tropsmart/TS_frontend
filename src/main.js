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
import * as VueGoogleMaps from "vue2-google-maps"
import VueGeolocation from "vue-browser-geolocation"

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

Vue.use(VueGeolocation)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCBjrH92QUYFOFEp3sfnFB2GaWzTMZC26Q',
    libraries: 'geometry,drawing,places,visualization'
  }
})

new Vue({
  router,
  store,
  vuetify,
  VeeValidate,
  render: h => h(App)
}).$mount('#app')