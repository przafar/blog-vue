import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import router from './routes'
import VueResource from 'vue-resource'


Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:3000/'

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
