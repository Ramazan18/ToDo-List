<script lang="ts"> 
    import axios from 'axios'

    export default {
        name:'Todos',
        data(){
            return{
                todos:[],
                errors:[]
            }
        },
        created(){
            axios.get('https://dummyjson.com/todos')
            .then(response =>{
                this.todos = response.data
                console.log(response)
            })
            .catch(e =>{
                this.errors.push(e)
            })
        }
    }
</script>

<template>

    <div class="todos-item" v-for="value in todos" :key="value.todos">
        {{ value.todo }}

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

</template>