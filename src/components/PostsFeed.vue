<template>
  <div>
    <div class="d-flex align-baseline">
      <v-select
        style="max-width: 240px; width: 240px"
        class="mr-4"
        :items="authorsNames"
        v-model="selectedAuthor"
        label="Фильтр по автору"
        clearable
      ></v-select>

      <v-btn text plain @click="onSortClick"
        >Сортировать по заголовку {{ sortIcon }}</v-btn
      >

      <v-spacer></v-spacer>

      <v-btn text plain @click="onAddClick">Добавить запись</v-btn>
    </div>

    <div v-if="posts">
      <PostCard v-for="post in postsForDisplay" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard.vue'
import { POST_URL } from '@/lib/paths'
import { fetchPosts, fetchUsers } from '@/lib/api'

import {
  SORT,
  SORT_DEFAULT,
  SORT_OPTIONS_MAX,
  SORT_OPTIONS_MIN,
} from '@/lib/sort'

export default {
  components: {
    PostCard,
  },
  data() {
    return {
      posts: null,
      authorsNames: null,
      selectedAuthor: null,
      sortState: null,
    }
  },
  computed: {
    sortIcon() {
      return SORT[this.sortState].icon
    },
    postsForDisplay() {
      // todo: write with small separate functions

      // attention that objects in post still copied by link, but here it's ok
      const posts = [...this.posts]

      // filter author
      const withAuthor = this.selectedAuthor
        ? posts.filter(p => p.author === this.selectedAuthor)
        : posts

      // sort
      return SORT[this.sortState].sortFunction
        ? withAuthor.sort(SORT[this.sortState].sortFunction)
        : withAuthor
    },
  },
  async created() {
    this.setDefaultValues()

    const posts = await fetchPosts()
    const authors = await fetchUsers()

    this.setAuthorNamesFrom(authors)
    this.setPostsWithAuthors(posts, authors)
  },
  methods: {
    setDefaultValues() {
      this.sortState = SORT_DEFAULT
    },
    setAuthorNamesFrom(authors) {
      this.authorsNames = authors.map(a => a.name).sort()
    },
    setPostsWithAuthors(posts, authors) {
      const authorsNamesMap = {}
      authors.forEach(a => {
        authorsNamesMap[a.id] = a.name
      })
      this.posts = posts.map(p => ({ ...p, author: authorsNamesMap[p.userId] }))
    },
    onSortClick() {
      this.sortState += 1
      if (this.sortState > SORT_OPTIONS_MAX) {
        this.sortState = SORT_OPTIONS_MIN
      }
    },
    onAddClick() {
      this.$router.push(POST_URL)
    },
  },
}
</script>
