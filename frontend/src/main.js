import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'

// Import Bootstrap
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.min'

// Import router
import router from './router'

createApp(App).use(router).mount('#app')
