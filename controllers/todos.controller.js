// import createError from 'http-errors';

// import { db } from '../server.js';

// /* -------------------------------------------------------------------------- */
// /*                                get all todos                               */
// /* -------------------------------------------------------------------------- */
// export const getAllTodos = async (req, res) => {
//     res.json({ todos: db.data.todos })
// };

// /* -------------------------------------------------------------------------- */
// /*                            get single todo by id                           */
// /* -------------------------------------------------------------------------- */

// export const getTodoById = async (req, res) => {
//     const todoid = parseInt(req.params.id);
    
//     if (isNaN(todoid)) {
//         return res.status(400).json({ message: 'The todo\'s id supposed to be a number' });
//     }

//     const todoIndex = db.data.todos.findIndex(p => p.id === todoid);
//     if(todoIndex === -1){
//         return res.status(404).json({ message: "The TODO doesn't exist." });
//     }

   
//     await db.write()
//  res.send(db.data.todos[todoIndex])

// }

// /* -------------------------------------------------------------------------- */
// /*                               create new todo                              */
// /* -------------------------------------------------------------------------- */
// export const createNewTodo = async (req, res, next) => {
//     try{
   
//      const newTodo = { ...req.body, id: db.data.todos.slice(-1)[0]?.id + 1 || 1 };
    
//     if (!newTodo.title || !newTodo.description) {
//        // return res.status(400).json({ message: "Some of required fields are missed" });
//            next(createError(400, "Some required fields are missing"))
     
       
//     }

//     db.data.todos.push(newTodo);
//     await db.write();
//     res.status(200).json({ message: 'Todo added', todos: newTodo });
// }catch(err){
//     next(err)
// }
// }
// /* -------------------------------------------------------------------------- */
// /*                              update todo by id                             */
// /* -------------------------------------------------------------------------- */

// export const updateTodoById = async (req, res) => {
//     const todoid = parseInt(req.params.id);
    
//     if (isNaN(todoid)) {
//         return res.status(400).json({ message: 'The todo\'s id supposed to be a number' });
//     }

//     const todoIndex = db.data.todos.findIndex(p => p.id === todoid);
//     if(todoIndex === -1){
//         return res.status(404).json({ message: "The Todo doesn't exist." });
//     }
//     db.data.todos[todoIndex] = { ...db.data.todos[todoIndex], ...req.body };
//     await db.write();
    
//     res.json({
//         message: "TODO update successful!",
//         todos: db.data.todos[todoIndex]
//     });

// }

// /* -------------------------------------------------------------------------- */
// /*                              delete todo by id                             */
// /* -------------------------------------------------------------------------- */

// export const deleteTodoById = async (req, res) => {
//     const todoid = parseInt(req.params.id);
    
//     if (isNaN(todoid)) {
//         return res.status(400).json({ message: 'The todo\'s id supposed to be a number' });
//     }

//     const todoIndex = db.data.todos.findIndex(p => p.id === todoid);
//     if(todoIndex === -1){
//         return res.status(404).json({ message: "The Todo doesn't exist." });
//     }

//     db.data.todos.splice(todoIndex, 1);
//     await db.write()
//     res.send({ message: 'TODO deleted', todos: db.data.todos });
// }

import createError from 'http-errors';

import { db } from '../server.js';

/* -------------------------------------------------------------------------- */
/*                                get all todos                               */
/* -------------------------------------------------------------------------- */
export const getAllTodos = async (req, res, next) => {
    try {
        if(db.data.todos.length === 0){
            return next(createError(404, "No TODO found"))
        }
        res.json({ todos: db.data.todos });
    } catch (err) {
        next(err);
    }
};

/* -------------------------------------------------------------------------- */
/*                            get single todo by id                           */
/* -------------------------------------------------------------------------- */

export const getTodoById = async (req, res, next) => {
    try {
        const todoid = parseInt(req.params.id);
    
        if (isNaN(todoid)) {
            return next( createError(400, 'The todo\'s id supposed to be a number'));
        }

        const todoIndex = db.data.todos.findIndex(p => p.id === todoid);
        if(todoIndex === -1){
            return next(createError(404, "The TODO doesn't exist.")) ;
        }

        await db.write()
        res.send(db.data.todos[todoIndex])
    } catch (err) {
        next(err);
    }
}

/* -------------------------------------------------------------------------- */
/*                               create new todo                              */
/* -------------------------------------------------------------------------- */
export const createNewTodo = async (req, res, next) => {
    try {
        const newTodo = { ...req.body, id: db.data.todos.slice(-1)[0]?.id + 1 || 1,
        authorid: parseInt(req.params.uid)
        };

        if (!newTodo.title || !newTodo.description) {
            return next(createError(400, 'Some required fields are missing')) ;
        }

        db.data.todos.push(newTodo);
        await db.write();
        res.status(200).json({ message: 'Todo added', todos: newTodo });
    } catch (err) {
        next(err);
    }
}

/* -------------------------------------------------------------------------- */
/*                              update todo by id                             */
/* -------------------------------------------------------------------------- */

export const updateTodoById = async (req, res, next) => {
    try {
        const todoid = parseInt(req.params.id);
    
        if (isNaN(todoid)) {
            return next(createError(400, 'The todo\'s id supposed to be a number'));
        }

        const todoIndex = db.data.todos.findIndex(p => p.id === todoid);
        if(todoIndex === -1){
            return next(createError(404, "The Todo doesn't exist.")) 
        }
        db.data.todos[todoIndex] = { ...db.data.todos[todoIndex], ...req.body };
        await db.write();

        res.json({
            message: 'TODO update successful!',
            todos: db.data.todos[todoIndex]
        });
    } catch (err) {
        next(err);
    }
}

/* -------------------------------------------------------------------------- */
/*                              delete todo by id                             */
/* -------------------------------------------------------------------------- */

export const deleteTodoById = async (req, res, next) => {
    try {
        const todoid = parseInt(req.params.id);
    
        if (isNaN(todoid)) {
            return next(createError(400, 'The todo\'s id supposed to be a number')) ;
        }

        const todoIndex = db.data.todos.findIndex(p => p.id === todoid);
        if(todoIndex === -1){
            return next(createError(404, "The Todo doesn't exist.")) 
        }

        db.data.todos.splice(todoIndex, 1);
        await db.write()
        res.send({ message: 'TODO deleted', todos: db.data.todos });
    } catch (err) {
        next(err)
    }
}