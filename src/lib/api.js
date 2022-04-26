const API_URL = 'https://jsonplaceholder.typicode.com/'
const API_POSTS = 'posts'
const API_USERS = 'users'
const API_POST_COMMENTS = 'comments'

// POSTS
export async function fetchPosts() {
  return fetchData(API_POSTS)
}

export async function fetchPostById(id) {
  return fetchData(API_POSTS + '/' + id)
}

export async function fetchPostCommentsByPostId(id) {
  const queryParams = new URLSearchParams({ postId: id })
  return fetchData(API_POST_COMMENTS + '?' + queryParams)
}

export async function addPost(payload) {
  return postData(API_POSTS, payload)
}

// USERS
export async function fetchUsers() {
  return fetchData(API_USERS)
}

export async function fetchUserById(id) {
  return fetchData(`${API_USERS}/${id}`)
}

async function postData(url, payload) {
  try {
    const rawPostResult = await fetch(API_URL + url, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    const postResult = await rawPostResult.json()
    return postResult
  } catch (e) {
    // handle error
  }
}

async function fetchData(url) {
  try {
    const rawData = await fetch(API_URL + url)
    const data = await rawData.json()
    return data
  } catch (e) {
    // handle error
  }
}
