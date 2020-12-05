import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LetItSnow from 'vue-let-it-snow'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyA3YVagsqmCyvbibtgeRpHtR7ryPAFlrhc",
  authDomain: "barbaraff-links.firebaseapp.com",
  projectId: "barbaraff-links",
  storageBucket: "barbaraff-links.appspot.com",
  messagingSenderId: "415497859474",
  appId: "1:415497859474:web:baa92d101421a08834d14b"
}
firebase.initializeApp(firebaseConfig)

Vue.use(LetItSnow)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
