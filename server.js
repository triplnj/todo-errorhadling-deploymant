import express from "express"
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import cors from 'cors'
import morgan from 'morgan'
import { mainErrorHandler, noContent, noRouteHandler } from "./middlewares/error-handler.mdw.js"
import todoRouter from "./router/todos.route.js"
import usersRouter from "./router/users.route.js"
import dotenv from 'dotenv'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan('tiny'))
dotenv.config()


const adapter = new JSONFile('db.json')
export const db = new Low(adapter)
await db.read()
db.data = db.data || { users:[], todos:[] }

app.use('/api/users', usersRouter)
app.use('/api/todos', todoRouter)



app.use(noRouteHandler)
app.use(noContent)
app.use(mainErrorHandler)




const port = process.env.PORT;
app.listen(port, console.log('Server is up on port', port))