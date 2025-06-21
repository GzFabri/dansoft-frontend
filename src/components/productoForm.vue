<template>
  <v-dialog v-model="modelValue" max-width="500px">
    <v-card>
      <v-card-title>
        {{ producto && producto.id ? 'Editar Producto' : 'Agregar Producto' }}
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="save">
          <v-text-field v-model="form.nombre" label="Nombre" required />
          <v-text-field v-model="form.precio" label="Precio" type="number" required />
          <v-text-field v-model="form.stock" label="Stock" type="number" required />
          <v-select
            v-model="form.categoriaId"
            :items="categorias"
            item-title="nombre"
            item-value="id"
            label="Categoría"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close">Cancelar</v-btn>
        <v-btn color="primary" @click="save">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import productoService from '../services/productoService'
const props = defineProps({
  modelValue: Boolean,
  producto: Object,
  categorias: Array,
})
const emit = defineEmits(['update:modelValue', 'refresh'])

const form = ref({
  nombre: '',
  precio: 0,
  stock: 0,
  categoriaId: null,
})

watch(
  () => props.producto,
  (nuevo) => {
    if (nuevo) {
      form.value = {
        nombre: nuevo.nombre,
        precio: nuevo.precio,
        stock: nuevo.stock,
        categoriaId: nuevo.categoria?.id || null,
      }
    } else {
      form.value = { nombre: '', precio: 0, stock: 0, categoriaId: null }
    }
  },
  { immediate: true },
)

function close() {
  emit('update:modelValue', false)
}

async function save() {
  if (props.producto && props.producto.id) {
    await productoService.update(props.producto.id, form.value)
  } else {
    await productoService.create(form.value)
  }
  emit('refresh')
  close()
}
</script>
