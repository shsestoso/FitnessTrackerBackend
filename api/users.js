/* eslint-disable no-useless-catch */
const express = require("express");
const userRouter = express.Router();
const {createUser} = require('../db');

// practice 


// POST /api/users/register
userRouter.post('/register', async(req, res, next)=>{
    try{
        const {username, password} = req.body;
        if (password.length < 8){
            throw new Error ("Password length need to be at least 8 character");
        }
        const user = await createUser({username, password});
        res.send({user});
    }
catch(err){
next(err);
}
});

// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = userRouter;
