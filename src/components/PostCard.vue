<template>
  <v-card class="mb-4">
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-subtitle>{{ post.author }}</v-card-subtitle>
    <v-card-text>{{ post.body }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['post'],
}
</script>
