// default
import Vue from 'vue';
import Router from 'vue-router';

// Pages
import Home from '@/pages/Home.vue';
import NotFound from '@/pages/404.vue';

Vue.use(Router);

// Routering
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});
