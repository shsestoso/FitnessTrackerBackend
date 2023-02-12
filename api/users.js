/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const {createUser, getUser} = require('../db');
const jwt = require('jsonwebtoken');
const {JWT} = process.env;



// POST /api/users/register
router.post('/register', async(req, res, next)=>{
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

module.exports = router;
