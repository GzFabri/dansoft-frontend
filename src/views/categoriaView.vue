<template>
  <v-container>
    <h2>Listado de Categorías</h2>

    <v-btn color="primary" class="mb-4" @click="abrirFormulario()">Nueva Categoría</v-btn>

    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          {{ categoriaSeleccionada ? 'Editar Categoría' : 'Nueva Categoría' }}
        </v-card-title>
        <v-card-text>
          <CategoriaForm :categoriaId="categoriaSeleccionada" :onSuccess="cerrarFormulario" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="cerrarFormulario">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row class="mb-4" dense>
      <v-col cols="12" md="4">
        <v-text-field v-model="filtroNombre" label="Buscar por nombre" clearable />
      </v-col>
    </v-row>

    <v-data-table :items="categoriasFiltradas" :headers="headers">
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
import CategoriaForm from '@/components/categoriaForm.vue'
import { getCategorias, deleteCategoria } from '@/services/categoriaService'

const categorias = ref([])
const dialog = ref(false)
const categoriaSeleccionada = ref<number | null>(null)
const filtroNombre = ref('')

const headers = [
  { title: 'Nombre', value: 'nombre' },
  {
    title: 'Acciones',
    value: 'actions',
    sortable: false,
    align: 'center',
    headerProps: { class: 'acciones-columna' },
  },
]

const fetchCategorias = async () => {
  const { data } = await getCategorias()
  categorias.value = data
}

const abrirFormulario = (id: number | null = null) => {
  categoriaSeleccionada.value = id
  dialog.value = true
}

const cerrarFormulario = async () => {
  dialog.value = false
  categoriaSeleccionada.value = null
  await fetchCategorias()
}

const eliminar = async (id: number) => {
  await deleteCategoria(id)
  await fetchCategorias()
}

const categoriasFiltradas = computed(() => {
  return categorias.value.filter(
    (c) => !filtroNombre.value || c.nombre.toLowerCase().includes(filtroNombre.value.toLowerCase()),
  )
})

onMounted(fetchCategorias)
</script>

<style scoped>
.acciones-columna,
td[data-test='actions'] {
  min-width: 110px;
  text-align: center;
}
</style>
