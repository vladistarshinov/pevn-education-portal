import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMeta from 'vue-meta'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.use(VueAxios, axios)
Vue.use(VueMeta)

axios.defaults.baseURL = 'http://localhost:3000/'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
