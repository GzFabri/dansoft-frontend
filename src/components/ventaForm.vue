<template>
  <v-form @submit.prevent="onSubmit">
    <v-select
      v-model="form.productoId"
      :items="productos"
      item-title="nombre"
      item-value="id"
      label="Producto"
      required
    />
    <v-text-field
      v-model="form.cantidad"
      label="Cantidad"
      type="number"
      min="1"
      required
    />
    <v-btn type="submit" color="primary" block>
      {{ ventaId ? 'Actualizar' : 'Crear' }}
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { createVenta, updateVenta, getVentaById } from '@/services/ventaService'
import axios from 'axios'

const props = defineProps<{
  ventaId?: number | null
  onSuccess?: () => void
}>()

const form = ref({
  productoId: null,
  cantidad: 1
})

const productos = ref([])

const cargarVenta = async () => {
  if (props.ventaId) {
    const { data } = await getVentaById(props.ventaId)
    form.value = {
      productoId: data.productoId,
      cantidad: data.cantidad
    }
  } else {
    form.value = {
      productoId: null,
      cantidad: 1
    }
  }
}

const cargarProductos = async () => {
  const { data } = await axios.get('/productos')
  productos.value = data
}

onMounted(() => {
  cargarVenta()
  cargarProductos()
})
watchEffect(cargarVenta)

const onSubmit = async () => {
  if (props.ventaId) {
    await updateVenta(props.ventaId, form.value)
  } else {
    await createVenta(form.value)
  }
  props.onSuccess?.()
}
</script>