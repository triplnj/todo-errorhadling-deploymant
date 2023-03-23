import express from 'express'
import { getAllUsers, createNewUser, getUserById, updateUserById, deleteUserById} from '../controllers/users.controller.js'
const usersRouter = express.Router()


usersRouter.route('/')
.get(getAllUsers)
.post(createNewUser)

usersRouter.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById)


export default usersRouter