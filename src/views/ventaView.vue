<template>
  <v-container>
    <h2>Listado de Ventas</h2>

    <v-btn color="primary" class="mb-4" @click="abrirFormulario()">Nueva Venta</v-btn>

    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          {{ ventaSeleccionada ? 'Editar Venta' : 'Nueva Venta' }}
        </v-card-title>
        <v-card-text>
          <VentaForm :ventaId="ventaSeleccionada" :onSuccess="cerrarFormulario" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="cerrarFormulario">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row class="mb-4" dense>
      <v-col cols="12" md="4">
        <v-text-field v-model="filtroProducto" label="Buscar por producto" clearable />
      </v-col>
    </v-row>

    <v-data-table :items="ventasFiltradas" :headers="headers">
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
      <template #item['producto.nombre']="{ item }">
        {{ item.producto?.nombre || 'Sin producto' }}
      </template>
      <template #item.createdAt="{ item }">
        {{ formatFecha(item.createdAt) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import VentaForm from '@/components/ventaForm.vue'
import { getVentas, deleteVenta } from '@/services/ventaService'

const ventas = ref([])
const dialog = ref(false)
const ventaSeleccionada = ref<number | null>(null)
const filtroProducto = ref('')

const headers = [
  { title: 'Producto', value: 'producto.nombre' },
  { title: 'Cantidad', value: 'cantidad' },
  { title: 'Fecha', value: 'createdAt' },
  { title: 'Acciones', value: 'actions', sortable: false, align: 'center', headerProps: { class: 'acciones-columna' } }
]

const fetchVentas = async () => {
  const { data } = await getVentas()
  ventas.value = data
}

const abrirFormulario = (id: number | null = null) => {
  ventaSeleccionada.value = id
  dialog.value = true
}

const cerrarFormulario = async () => {
  dialog.value = false
  ventaSeleccionada.value = null
  await fetchVentas()
}

const eliminar = async (id: number) => {
  await deleteVenta(id)
  await fetchVentas()
}

const ventasFiltradas = computed(() => {
  return ventas.value.filter((v) =>
    !filtroProducto.value ||
    (v.producto && v.producto.nombre && v.producto.nombre.toLowerCase().includes(filtroProducto.value.toLowerCase()))
  )
})

function formatFecha(fecha: string) {
  if (!fecha) return ''
  return new Date(fecha).toLocaleString()
}

onMounted(fetchVentas)
</script>

<style scoped>
.acciones-columna {
  min-width: 110px;
  text-align: center !important;
}
</style>

