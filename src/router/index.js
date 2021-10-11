import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if(store.state.stayloggedIn === false ) next()
        else next({ name: 'Home'}) 
      }
    },
   {
     path: '/home',
     name: 'Home',
     // route level code-splitting
     // this generates a separate chunk (about.[hash].js) for this route
     // which is lazy-loaded when the route is visited.
     component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
   },
   {
    path: '/duty/:id',
    name: 'Working',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Working.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/projects/:id',
    name: 'Project',
    component: () => import('../views/Project_Template.vue')
  },
  {
    path: '/createproject',
    name: 'CreateProject',
    component: () => import('../views/CreateProject.vue')

  },
  {
    path: '/stats',
    name:'Statistics',
    component: () => import('../views/Statistics.vue')
  },
  {
    path: '/progress',
    name:'Progress',
    component: () => import('../views/Progress.vue')
  },
  {
    path: '/collab',
    name:'Collab',
    component: () => import('../views/Collaborators.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeResolve((to, from, next) => {
  if( to.name == 'Login') next()
  else{
    if(store.state.currentUser === null) next({ name: 'Login'})
    else next()
  }
})

export default router
