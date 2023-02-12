/* eslint-disable no-useless-catch */
const express = require("express");
const userRouter = express.Router();
const {createUser, getUserByUsername} = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;



userRouter.use((req, res, next) => {
    console.log('a request is being made');
    next ();
})

// POST /api/users/register
userRouter.post('/register', async(req, res, next)=>{
    const {username, password} = req.body;
    
    try{
       const users = await getUserByUsername(username);
       if (users){
        res.status(500).send({name: "AN", message: `User ${username} is already taken.`, error: "failed"});
       }
        else if (password.length < 8){
            res.status(500).send({name: "Shaira", message: `Password Too Short!`, error: "it's failed"});        }
        const user = await createUser({username, password});
        const token = jwt.sign({id: user.id, username}, JWT_SECRET, {expiresIn: "1w"})
        res.send({message: "thank you for signing up", token, user})
    }
catch ({name, message, error}){
next(name, message, error);
}
});

// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = userRouter;
