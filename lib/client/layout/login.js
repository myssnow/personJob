import Vue from "vue"

import App from "../src/pages/login/index.vue"
// console.log(App)
const app = new Vue({
  render: h => h(App)
}).$mount('#app')