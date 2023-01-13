import {ref} from 'vue'
import {useFetch} from './fetch'

export async function useTodos() {
  const loaded = ref(false)
  const {response: todos, request} = useFetch('https://dummyjson.com/todos')

  if (!loaded.value) {
    await request()
    loaded.value = true
  }

  return {users}
}