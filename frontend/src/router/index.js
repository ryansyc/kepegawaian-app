//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
  {
    path: '/',
    redirect: '/employees',
  },
  {
    path: '/employees',
    name: 'employees.index',
    component: () => import('@/views/employees/Index.vue'),
  },
  {
    path: '/employees/create',
    name: 'employees.create',
    component: () => import('@/views/employees/Create.vue'),
  },
  {
    path: '/employees/edit/:id',
    name: 'employees.edit',
    component: () => import('@/views/employees/Edit.vue'),
  },
  {
    path: '/positions',
    name: 'positions.index',
    component: () => import('@/views/positions/Index.vue'),
  },
  {
    path: '/positions/create',
    name: 'positions.create',
    component: () => import('@/views/positions/Create.vue'),
  },
  {
    path: '/positions/edit/:id',
    name: 'positions.edit',
    component: () => import('@/views/positions/Edit.vue'),
  },
]

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // config routes
})

export default router
