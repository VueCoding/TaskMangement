import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Dashboard from './views/Dashboard.vue';
import Create from './views/Create.vue';
import View from './views/View.vue';
import store from './store';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/create-task', component: Create },
  { path: '/edit-task/:id', component: Create },
  { path: '/view-task', component: View },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  let isAuth = !!token;

  if (to.path.startsWith('/dashboard') && !isAuth) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && isAuth) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
