<template>
  <div v-if="post">
    <div class="post mb-6">
      <div class="display-1">{{ post.title }}</div>

      <div v-if="author" class="d-flex mb-4">
        <div class="font-weight-bold mr-2">{{ author.name }}</div>
        <div class="text--grey mr-2">{{ author.email }}</div>
        <div class="text--grey mr-2">
          (email not match with name at jsonplaceholder)
        </div>
      </div>

      <div class="mb-2">{{ post.body }}</div>

      <router-link to="/">Назад</router-link>
    </div>

    <div class="comment">
      <div class="title mb-2">Комментарии:</div>
      <div v-if="comments">
        <v-card v-for="comment in comments" :key="comment.id" class="mb-4">
          <v-card-title>{{ comment.name }}</v-card-title>
          <v-card-text>{{ comment.body }}</v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null,
      author: null,
      comments: null,
    }
  },
  computed: {
    postId() {
      return Number(this.$route.params.id)
    },
  },
  async created() {
    console.log('go create')
    const rawPost = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${this.postId}`
    )
    this.post = await rawPost.json()
    const authorId = this.post.userId

    const rawAuthor = await fetch(
      `https://jsonplaceholder.typicode.com/users/${authorId}`
    )
    this.author = await rawAuthor.json()

    const rawComments = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${this.postId}`
    )
    this.comments = await rawComments.json()
  },
}
</script>
