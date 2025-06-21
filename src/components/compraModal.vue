<template>
  <v-dialog v-model="modelValue" max-width="400px">
    <v-card>
      <v-card-title>Comprar Producto</v-card-title>
      <v-card-text>
        <div v-if="producto">
          <p><strong>Producto:</strong> {{ producto.nombre }}</p>
          <p><strong>Precio:</strong> ${{ producto.precio }}</p>
          <v-text-field
            v-model="cantidad"
            label="Cantidad"
            type="number"
            min="1"
            :max="producto.stock"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close">Cancelar</v-btn>
        <v-btn color="green" @click="comprar">Comprar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import comprarService from '../services/comprarService'
const props = defineProps({
  modelValue: Boolean,
  producto: Object,
})
const emit = defineEmits(['update:modelValue', 'refresh'])

const cantidad = ref(1)

watch(
  () => props.producto,
  () => {
    cantidad.value = 1
  },
)

function close() {
  emit('update:modelValue', false)
}

async function comprar() {
  if (props.producto && cantidad.value > 0) {
    await comprarService.comprarProducto(props.producto.id, cantidad.value)
    emit('refresh')
    close()
  }
}
</script>
