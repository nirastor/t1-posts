<template>
  <div>
    <div v-if="result">
      <div>
        Новый пост с id {{ result.id }} как будто добавлен на jsonplaceholder
      </div>
      <v-btn @click="addMore">Добавить еще </v-btn>
    </div>

    <div v-else>
      <div>Добавить запись. Тут пока никаких проверок</div>
      <v-text-field v-model="newPost.author" label="Автор"></v-text-field>
      <v-text-field v-model="newPost.email" label="Email"></v-text-field>
      <v-textarea v-model="newPost.text" label="Текст"></v-textarea>
      <v-btn @click="onClick">Добавить</v-btn>
    </div>
  </div>
</template>

<script>
import { addPost } from '@/lib/api'

export default {
  data() {
    return {
      newPost: {
        text: '',
        author: '',
        email: '',
      },
      result: null,
    }
  },
  methods: {
    addMore() {
      this.result = null
    },
    async onClick() {
      this.result = await addPost(this.newPost)
    },
  },
}
</script>
