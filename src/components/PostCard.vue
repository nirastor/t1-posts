<template>
  <v-card class="mb-4" @click="onClick">
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-subtitle>{{ post.author }}</v-card-subtitle>
    <v-card-text>{{ post.body }}</v-card-text>
  </v-card>
</template>

<script>
import { POST_URL } from '@/lib/paths'

export default {
  props: ['post'],
  methods: {
    onClick() {
      this.$router.push(POST_URL + '/' + this.post.id)
    },
  },
}
</script>
