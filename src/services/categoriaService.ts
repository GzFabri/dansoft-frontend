import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export const getCategorias = () => api.get('/categorias')
export const getCategoriaById = (id: number) => api.get(`/categorias/${id}`)
export const createCategoria = (data: any) => api.post('/categorias', data)
export const updateCategoria = (id: number, data: any) => api.put(`/categorias/${id}`, data)
export const deleteCategoria = (id: number) => api.delete(`/categorias/${id}`)
