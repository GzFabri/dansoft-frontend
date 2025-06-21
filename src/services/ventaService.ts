import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export const getVentas = () => api.get('/ventas')
export const getVentaById = (id: number) => api.get(`/ventas/${id}`)
export const createVenta = (venta: { productoId: number; cantidad: number }) =>
  api.post('/ventas', venta)
export const updateVenta = (id: number, venta: { productoId: number; cantidad: number }) =>
  api.put(`/ventas/${id}`, venta)
export const deleteVenta = (id: number) => api.delete(`/ventas/${id}`)
