import { createRouter, createWebHistory } from 'vue-router'
import productoView from '../views/productoView.vue'
import categoriaView from '../views/categoriaView.vue'
import ventaView from '../views/ventaView.vue'


const routes = [
  {
    path: '/productos',
    name: 'productos',
    component: productoView,
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: categoriaView,
  },
  {
    path: '/venta',
    name: 'ventas',
    component: ventaView,
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
