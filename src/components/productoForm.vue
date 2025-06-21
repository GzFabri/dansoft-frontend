<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="form.nombre" label="Nombre" required />
    <v-text-field v-model="form.descripcion" label="Descripción" required />
    <v-text-field v-model.number="form.precio" label="Precio" type="number" required />
    <v-text-field v-model.number="form.stock" label="Stock" type="number" required />

    <v-select
      v-model="form.categoriaId"
      :items="categorias"
      item-title="nombre"
      item-value="id"
      label="Categoría"
      required
    />

    <v-btn type="submit" color="primary" block>
      {{ productoId ? 'Actualizar' : 'Crear' }}
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import {
  createProducto,
  updateProducto,
  getProductoById
} from '@/services/productoService'
import axios from 'axios'

interface Props {
  productoId?: number | null
  onSuccess?: () => void
}
const props = defineProps<Props>()

const form = ref({
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  categoriaId: null
})

const categorias = ref([])

const cargarProducto = async () => {
  if (props.productoId) {
    const { data } = await getProductoById(props.productoId)
    form.value = {
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: data.precio,
      stock: data.stock,
      categoriaId: data.categoriaId
    }
  } else {
    form.value = {
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      categoriaId: null
    }
  }
}

const cargarCategorias = async () => {
  const { data } = await axios.get('http://localhost:3333/categorias')
  categorias.value = data
}

onMounted(() => {
  cargarCategorias()
  cargarProducto()
})
watchEffect(cargarProducto)

const onSubmit = async () => {
  if (props.productoId) {
    await updateProducto(props.productoId, form.value)
  } else {
    await createProducto(form.value)
  }
  props.onSuccess?.()
}
</script>
