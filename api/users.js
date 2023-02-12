/* eslint-disable no-useless-catch */
const express = require("express");
const userRouter = express.Router();
const {createUser, getUserByUsername, getUser, getPublicRoutinesByUser, getAllRoutinesByUser} = require('../db');
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
            res.status(500).send({name: "Shaira", message: `Password Too Short!`, error: "it's failed"});}
        else{
            const user = await createUser({username, password});
        const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET)
        res.send({message: "thank you for signing up", token, user})
        }
    }
catch ({name, message, error}){
next(name, message, error);
}
});

// POST /api/users/login

userRouter.post('/login', async (req, res, next)=>{
    try {
        const{username, password} = req.body;
        const user = await getUser({username,password});
        const Username = await getUserByUsername(username)
        if (!user){
            res.status(401).send({name:"", message:"", error:""});
        }
        else{
        const token = jwt.sign(
            {id: user.id, username: user.username}, 
            process.env.JWT_SECRET
        );
        res.send({token,message: "you're logged in!",user: {id: Username.id, username}});
        }
    } catch (err) {
        next(err);
    }
})

// GET /api/users/me
userRouter.get('/me', async (req, res, next)=> {
   try {
    const authorization = req.header("Authorization");
    console.log(authorization)

    if (!authorization){
        res.status(401).send({error: "Access denied. No token provided.",
     message: "You must be logged in to perform this action",
    name: "Error"});
    }
    else{
        const token = authorization.slice(7)
        const toverify = jwt.verify(token, process.env.JWT_SECRET);
        const username = toverify.username 
        const user = await getUserByUsername(username);
        if (token){
            res.send(user);
        }
    }
   } catch (error) {
    next(error);
   }
})

// // GET /api/users/:username/routines
userRouter.get('/:username/routines', async (req,res, next) =>{
    const {username} = req.params;
    const token = req.header("Authorization").slice(7);
    const toverify = jwt.verify(token, process.env.JWT_SECRET);
    const routines = await getPublicRoutinesByUser({username})
    const allRoutines = await getAllRoutinesByUser({username})
    try {
        if(toverify.username === username){
            res.send(allRoutines)
        }
        else{
            res.send(routines)
        }
    } catch (error) {
        next(error);
    }
})

module.exports = userRouter;
