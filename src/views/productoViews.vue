<template>
  <v-container>
    <v-row class="justify-space-between align-center mb-4">
      <v-col cols="12" sm="6">
        <v-text-field v-model="search" label="Buscar producto" @input="fetchProductos" />
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="categoriaId"
          :items="categorias"
          item-title="nombre"
          item-value="id"
          label="Filtrar por categoría"
          @change="fetchProductos"
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-btn color="primary" @click="abrirDialogoCrear">Crear producto</v-btn>
      </v-col>
    </v-row>

    <v-data-table :headers="headers" :items="productos" class="elevation-1">
      <template #item.acciones="{ item }">
        <v-btn icon @click="editarProducto(item)"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon @click="eliminarProducto(item.id)" color="red"><v-icon>mdi-delete</v-icon></v-btn>
        <v-btn icon @click="abrirDialogoCompra(item)"><v-icon>mdi-cart</v-icon></v-btn>
      </template>
    </v-data-table>

    <producto-form
      v-if="dialogoForm"
      :producto="productoActual"
      :categorias="categorias"
      @close="cerrarDialogoForm"
      @guardado="fetchProductos"
    />

    <compra-modal
      v-if="dialogoCompra"
      :producto="productoCompra"
      @close="cerrarDialogoCompra"
      @comprado="fetchProductos"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getCategorias } from '@/services/categorias'
import { getProductos, deleteProducto } from '@/services/productos'
import ProductoForm from '@/components/productoForm.vue'
import CompraModal from '@/components/compraModal.vue'

const productos = ref([])
const categorias = ref([])
const search = ref('')
const categoriaId = ref(null)
const dialogoForm = ref(false)
const dialogoCompra = ref(false)
const productoActual = ref(null)
const productoCompra = ref(null)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nombre', key: 'nombre' },
  { title: 'Descripción', key: 'descripcion' },
  { title: 'Precio', key: 'precio' },
  { title: 'Stock', key: 'stock' },
  { title: 'Categoría', key: 'categoria.nombre' },
  { title: 'Acciones', key: 'acciones', sortable: false },
]

const fetchProductos = async () => {
  const response = await getProductos({ search: search.value, categoriaId: categoriaId.value })
  productos.value = response
}

const fetchCategorias = async () => {
  categorias.value = await getCategorias()
}

const abrirDialogoCrear = () => {
  productoActual.value = null
  dialogoForm.value = true
}

const editarProducto = (producto: any) => {
  productoActual.value = { ...producto }
  dialogoForm.value = true
}

const eliminarProducto = async (id: number) => {
  if (confirm('¿Está seguro de eliminar este producto?')) {
    await deleteProducto(id)
    fetchProductos()
  }
}

const abrirDialogoCompra = (producto: any) => {
  productoCompra.value = producto
  dialogoCompra.value = true
}

const cerrarDialogoForm = () => dialogoForm.value = false
const cerrarDialogoCompra = () => dialogoCompra.value = false

onMounted(() => {
  fetchCategorias()
  fetchProductos()
})
</script>
