import express from 'express'
import { getAllTodos, createNewTodo, getTodoById, updateTodoById, deleteTodoById} from '../controllers/todos.controller.js'
const todoRouter = express.Router()


todoRouter.route('/')
.get(getAllTodos)


todoRouter.route('/:uid')
.post(createNewTodo)

todoRouter.route('/:id')
.get(getTodoById)
.put(updateTodoById)
.delete(deleteTodoById)


export default todoRouter