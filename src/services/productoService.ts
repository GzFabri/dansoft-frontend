import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333', // Ajusta si tu backend usa otro puerto
})

export const getProductos = () => api.get('/productos')
export const getProductoById = (id: number) => api.get(`/productos/${id}`)
export const createProducto = (data: any) => api.post('/productos', data)
export const updateProducto = (id: number, data: any) => api.put(`/productos/${id}`, data)
export const deleteProducto = (id: number) => api.delete(`/productos/${id}`)
