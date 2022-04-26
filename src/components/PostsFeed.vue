<template>
  <div>
    <div class="d-flex">
      <v-select
        style="max-width: 320px"
        :items="authorsNames"
        v-model="selectedAuthor"
        label="Фильтр по автору"
        clearable
      ></v-select>
      <v-btn text @click="onSortClick"
        >Сортировать по заголовку {{ sortIcon }}</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn @click="onAddClick">Добавить запись</v-btn>
    </div>
    <div v-if="posts">
      <PostCard v-for="post in postsForDisplay" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
// todo: design of buttons-bar

import PostCard from '@/components/PostCard.vue'

// todo move to sorting helper
const ascByTitleSort = (a, b) => {
  if (a.title > b.title) return 1
  if (a.title < b.title) return -1
  return 0
}

const descByTitleSort = (a, b) => {
  if (a.title < b.title) return 1
  if (a.title > b.title) return -1
  return 0
}

const SORT = {
  0: { name: 'default', icon: '' },
  1: { name: 'asc', icon: '▲', sortFunction: ascByTitleSort },
  2: { name: 'desc', icon: '▼', sortFunction: descByTitleSort },
}

export default {
  components: {
    PostCard,
  },
  data() {
    return {
      posts: null,
      authorsNames: null,
      selectedAuthor: null,
      sortState: 0,
    }
  },
  methods: {
    // todo: Remove magic digits
    onSortClick() {
      this.sortState = this.sortState === 2 ? 0 : this.sortState + 1
    },
    onAddClick() {
      this.$router.push('/post')
    },
  },
  computed: {
    sortIcon() {
      return SORT[this.sortState].icon
    },
    postsForDisplay() {
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
    // todo: need try catch
    // todo: move to store
    // todo: split to different functions by comments

    // get posts
    const rawPosts = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await rawPosts.json()

    // get authors
    const rawAuthors = await fetch('https://jsonplaceholder.typicode.com/users')
    const authors = await rawAuthors.json()
    // todo: better use select with authorId but for demo purpose it will be name
    this.authorsNames = authors.map(a => a.name).sort()

    // merge posts and authors
    const authorsNamesMap = {}
    authors.forEach(a => {
      authorsNamesMap[a.id] = a.name
    })
    this.posts = posts.map(p => ({ ...p, author: authorsNamesMap[p.userId] }))
  },
}
</script>
