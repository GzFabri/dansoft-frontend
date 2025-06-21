<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Gestor de Productos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/productos" text>Productos</v-btn>
      <v-btn to="/categorias" text>Categorías</v-btn>
      <v-btn to="/ventas" text>Ventas</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


