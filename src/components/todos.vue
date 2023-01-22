<script> 
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
            this.todos = response.data.todos
            console.log(this.todos)
        })
        .catch(e =>{
            this.errors.push(e)
        })
    }
}
</script>

<template>

<div class="todos-item" v-for="(value,index) in todos" :key="index">
      <label>
        <input type="checkbox" v-model="value.completed" />
                    <span class="bubble"></span>
      </label>

      <div class="todo-content">
        <input type="text" v-model="value.todo" />
      </div>

      <div class="actions">
        <button class="delete" @click="removeTodo(value)">Delete</button>
      </div>
    </div>

</template>

<style scoped>
.todo-list .todo-item {
	display: flex;
	align-items: center;
	background-color: #FFF;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1rem;
}
.todo-item .todo-content {
	flex: 1 1 0%;
}
.todo-item .actions {
	display: flex;
	align-items: center;
}
</style>

