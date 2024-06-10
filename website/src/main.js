import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router/routes';

import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/aura-light-green/theme.css'

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia)
app.use(PrimeVue);
app.mount('#app');
