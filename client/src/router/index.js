import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "Auth" */ '../views/Auth.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue')
  },
  {
    path: '/teacher/my-courses',
    name: 'Courses',
    component: () => import(/* webpackChunkName: "Courses" */ '../views/teacher/Courses.vue')
  },
  {
    path: '/teacher/tasks/:c_id',
    name: 'Tasks',
    component: () => import(/* webpackChunkName: "Tasks" */ '../views/teacher/Tasks.vue')
  },
  {
    path: '/student/courses',
    name: 'StudCourses',
    component: () => import(/* webpackChunkName: "Courses" */ '../views/student/Courses.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
