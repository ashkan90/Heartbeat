import Vue from 'vue'
import Vuex from 'vuex'
import './plugins/vuetify'
import App from './App.vue'
import {routes} from './routes'
import {storeDef} from './store'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

window.fs = require('fs')

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
	routes,
	mode: 'history'
})

const store = new Vuex.Store( storeDef )


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
