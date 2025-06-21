<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="form.nombre" label="Nombre" required />
    <v-btn type="submit" color="primary" block>
      {{ categoriaId ? 'Actualizar' : 'Crear' }}
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { createCategoria, updateCategoria, getCategoriaById } from '@/services/categoriaService'

interface Props {
  categoriaId?: number | null
  onSuccess?: () => void
}
const props = defineProps<Props>()

const form = ref({
  nombre: '',
})

const cargarCategoria = async () => {
  if (props.categoriaId) {
    const { data } = await getCategoriaById(props.categoriaId)
    form.value = {
      nombre: data.nombre,
    }
  } else {
    form.value = {
      nombre: '',
    }
  }
}

onMounted(cargarCategoria)
watchEffect(cargarCategoria)

const onSubmit = async () => {
  if (props.categoriaId) {
    await updateCategoria(props.categoriaId, form.value)
  } else {
    await createCategoria(form.value)
  }
  props.onSuccess?.()
}
</script>
