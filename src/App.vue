<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, computed, watch, onBeforeMount, defineComponent } from 'vue'
import Todos from './components/todos.vue'

const todos = ref([])
const name = ref('')
const input_content = ref('') 

watch(todos, (newVal) => {
	localStorage.setItem('todos', JSON.stringify(newVal))
}, {
	deep: true
})

const todos_asc = computed(() => todos.value.sort((a,b) =>{
	return a.createdAt - b.createdAt
}))

const addTodo = () => {
	if (input_content.value.trim() === '') {
		return
	}
	todos.value.push({
		content: input_content.value,
		done: false,
		editable: false,
		createdAt: new Date().getTime()
	})
}

const removeTodo = (todo) => {
	todos.value = todos.value.filter((t) => t !== todo)
}

onMounted(() => {
	todos.value = JSON.parse(localStorage.getItem('todos')) || []
})
</script>

<template>
	<main class="app">

		<section class="create-todo">
			<h3>CREATE A TODO</h3>

			<form id="new-todo-form" @submit.prevent="addTodo">
				<h4>What's on your todo list?</h4>
				<input 
					type="text" 
					name="content" 
					id="content" 
					placeholder="e.g. make a task"
					v-model="input_content" />

				<input type="submit" value="Add todo" />
			</form>
		</section>

		<section class="todo-list">
			<h3>TODO LIST</h3>
			<div class="list" id="todo-list">

				<div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
					<label>
						<input type="checkbox" v-model="todo.done" />
						<span class="bubble"></span>
					</label>

					<div class="todo-content">
						<input type="text" v-model="todo.content" />
					</div>

					<div class="actions">
						<button class="delete" @click="removeTodo(todo)">Delete</button>
					</div>
				</div>

					<div>
						<Todos />
					</div>

			</div>
		</section>

	</main>
</template>
