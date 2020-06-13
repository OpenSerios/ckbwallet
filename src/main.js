import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n.js'
import CountryFlag from 'vue-country-flag'

Vue.component('country-flag', CountryFlag)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  mounted() {
    // Hide loader once vue is initialized
    const loader = document.getElementById('app_loading')
    if (loader) {
      loader.style.display = 'none'
    }
  },
  render: h => h(App)
}).$mount('#app')
