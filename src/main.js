import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import Notifications from '@kyvg/vue3-notification'
import store from './store'


const app = createApp(App).use(store);
app.use(Notifications);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

app.mount('#app');
