<template>
  <v-container>
    <h2>Listado de Productos</h2>

    <v-btn color="primary" class="mb-4" @click="abrirFormulario()">Nuevo Producto</v-btn>

    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>{{
          productoSeleccionado ? 'Editar Producto' : 'Nuevo Producto'
        }}</v-card-title>
        <v-card-text>
          <ProductoForm :productoId="productoSeleccionado" :onSuccess="cerrarFormulario" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="cerrarFormulario">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Agrega esto arriba de la tabla de productos -->
    <v-row class="mb-4" dense>
      <v-col cols="12" md="4">
        <v-text-field v-model="filtroNombre" label="Buscar por nombre" clearable />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="filtroCategoria"
          :items="categorias"
          item-title="nombre"
          item-value="id"
          label="Filtrar por categoría"
          clearable
        />
      </v-col>
    </v-row>

    <v-data-table :items="productosFiltrados" :headers="headers">
      <template #item.categoria="{ item }">
        {{ item.categoria?.nombre || 'Sin categoría' }}
      </template>
      <template #item.actions="{ item }">
        <div style="display: flex; gap: 8px; justify-content: center">
          <v-btn icon @click="abrirFormulario(item.id)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="error" @click="eliminar(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getProductos, deleteProducto } from '@/services/productoService'
import axios from 'axios'
import ProductoForm from '@/components/productoForm.vue'

const productos = ref([])
const categorias = ref([])
const dialog = ref(false)
const productoSeleccionado = ref<number | null>(null)

const filtroNombre = ref('')
const filtroCategoria = ref(null)

const headers = [
  { title: 'Nombre', value: 'nombre' },
  { title: 'Descripción', value: 'descripcion' },
  { title: 'Precio', value: 'precio' },
  { title: 'Stock', value: 'stock' },
  { title: 'Categoría', value: 'categoria.nombre' },
  { title: 'Acciones', value: 'actions', sortable: false, align: 'end' },
]

const fetchProductos = async () => {
  const { data } = await getProductos()
  productos.value = data
}

const fetchCategorias = async () => {
  const { data } = await axios.get('http://localhost:3333/categorias')
  categorias.value = data
}

const abrirFormulario = (id: number | null = null) => {
  productoSeleccionado.value = id
  dialog.value = true
}

const cerrarFormulario = async () => {
  dialog.value = false
  productoSeleccionado.value = null
  await fetchProductos()
}

const eliminar = async (id: number) => {
  await deleteProducto(id)
  await fetchProductos()
}

// Computed para filtrar productos
const productosFiltrados = computed(() => {
  return productos.value.filter((p) => {
    const coincideNombre =
      !filtroNombre.value || p.nombre.toLowerCase().includes(filtroNombre.value.toLowerCase())
    const coincideCategoria = !filtroCategoria.value || p.categoriaId === filtroCategoria.value
    return coincideNombre && coincideCategoria
  })
})

onMounted(() => {
  fetchProductos()
  fetchCategorias()
})
</script>

<style scoped>
.acciones-columna,
td[data-test='actions'] {
  min-width: 110px;
  text-align: center;
}
</style>
