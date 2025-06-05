import { createApp } from 'vue';
import RootComponent from './RootComponent.vue';
import router from './router';
import store from './store';
import '../css/app.css';
import 'bootstrap/dist/css/bootstrap.css';
import Vue3Toastify from 'vue3-toastify';

const app = createApp({});
app.use(router);
app.use(store);
app.use(Vue3Toastify, { autoClose: 1000 });
app.component('root-component', RootComponent);
app.mount('#app');
