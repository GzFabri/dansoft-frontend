import axios from 'axios'

// Productos
export const productoApi = {
  getAll: () => axios.get('/productos'),
  create: (producto: any) => axios.post('/productos', producto),
  update: (id: number, producto: any) => axios.put(`/productos/${id}`, producto),
  delete: (id: number) => axios.delete(`/productos/${id}`),
  get: (id: number) => axios.get(`/productos/${id}`),
}

// Categorías
export const categoriaApi = {
  getAll: () => axios.get('/categorias'),
}

// Compras
export const compraApi = {
  comprarProducto: (productoId: number, cantidad: number) =>
    axios.post('/compras', { productoId, cantidad }),
}
