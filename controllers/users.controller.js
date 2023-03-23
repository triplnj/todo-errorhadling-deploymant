

import createError from 'http-errors';

import { db } from '../server.js';

/* -------------------------------------------------------------------------- */
/*                                get all users                               */
/* -------------------------------------------------------------------------- */
export const getAllUsers = async (req, res, next) => {
    if(db.data.users.length === 0){
        return next(createError(404, "No user found" ))
    }
    res.json({ users: db.data.users })
};

/* -------------------------------------------------------------------------- */
/*                               get user by id                               */
/* -------------------------------------------------------------------------- */

export const getUserById = async (req, res, next) => {
    try{
    const userid = parseInt(req.params.id);
    
    if (isNaN(userid)) {
        return res.status(400).json({ message: 'The user id supposed to be a number' });
    }

    const userIndex = db.data.users.findIndex(p => p.id === userid);
    if(userIndex === -1){
        return res.status(404).json({ message: "The user doesn't exist." });
    }

   
    await db.write()
 res.send(db.data.users[userIndex])
}catch(err){
    next(err)
}

}
/* -------------------------------------------------------------------------- */
/*                               create new user                              */
/* -------------------------------------------------------------------------- */
export const createNewUser = async (req, res, next) => {
    try{
   
     const newUser = { ...req.body, id: db.data.users.slice(-1)[0]?.id + 1 || 1 };
     
    if (!newUser.fname || !newUser.lname || !newUser.userName || !newUser.password) {
       // return res.status(400).json({ message: "Some of required fields are missed" });
           return next(createError(400, "Some required fields are missing"))
     
       
    }

    db.data.users.push(newUser);
    await db.write();
    res.status(200).json({ message: 'User added', users: newUser });
}catch(err){
    next(err)
}
}
/* -------------------------------------------------------------------------- */
/*                              update user by id                             */
/* -------------------------------------------------------------------------- */

export const updateUserById = async (req, res, next) => {
    try{
    const userid = parseInt(req.params.id);
    
    if (isNaN(userid)) {
        return res.status(400).json({ message: 'The user id supposed to be a number' });
    }

    const userIndex = db.data.users.findIndex(p => p.id === userid);
    if(userIndex === -1){
        return res.status(404).json({ message: "The user doesn't exist." });
    }
    db.data.users[userIndex] = { ...db.data.users[userIndex], ...req.body };
    await db.write();
    
    res.json({
        message: "User update successful!",
        users: db.data.users[userIndex]
    });
}catch(err){
    next(err)
}

}
/* -------------------------------------------------------------------------- */
/*                              delete user by id                             */
/* -------------------------------------------------------------------------- */
export const deleteUserById = async (req, res, next) => {
    try{
    const userid = parseInt(req.params.id);
    
    if (isNaN(userid)) {
        return res.status(400).json({ message: 'The user id supposed to be a number' });
    }

    const userIndex = db.data.users.findIndex(p => p.id === userid);
    if(userIndex === -1){
        return res.status(404).json({ message: "The user doesn't exist." });
    }

    db.data.users.splice(userIndex, 1);
    await db.write()
    res.send({ message: 'User deleted', users: db.data.users });
}catch(err){
    next(err)
}
}