// src/stores/categoria.ts
import { defineStore } from 'pinia'

export const useCategoriaStore = defineStore('categoria', {
  state: () => ({
    categorias: [] as Array<{ id: number; nombre: string }>
  }),
  actions: {
    setCategorias(data: any) {
      this.categorias = data
    }
  }
})
