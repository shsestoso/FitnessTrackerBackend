const express = require('express');
const {  createRoutine, getAllPublicRoutines, updateRoutine, destroyRoutine } = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;



// GET /api/routines

router.get('/', async (req, res, next) => {

    const routines = await getAllPublicRoutines();
    res.send(routines);

});

// POST /api/routines
router.post('/', async (req, res, next)=>{
    const {isPublic, name, goal} = req.body;
    const authorization = req.header("authorization");
    try {
        if(!authorization){
            res.send({
            error: "Error",
            message: "You must be logged in to perform this action",
            name: "Error"
            });        
        }
        else{
            const token = authorization.slice(7)
            const user = jwt.verify(token, process.env.JWT_SECRET);
            const creatorId = user.id;
            const newRoutine = await createRoutine({creatorId, isPublic, name, goal})
            res.send(newRoutine);
        }
    } catch (error) {
        next(error)
    }
})

// PATCH /api/routines/:routineId

router.patch('/:routineId', async(req, res, next)=>{
        const authorization = req.header("authorization");
    try {
        if(!authorization){
            res.send({
            error: "Error",
            message: "You must be logged in to perform this action",
            name: "Error"
            });        
        }
        else{
        const {isPublic, name, goal} = req.body;
        const routine = await updateRoutine({
            id: req.params.routineId,
            isPublic,
            name,
            goal
        });
        res.send(routine);
    }
}
    catch(error){
        next(error);
    }
})

// DELETE /api/routines/:routineId


router.delete('/:routineId', async(req, res, next) =>{
    console.log('this is params for delete', req.params);
   const {routineId} = req.params;
    const authorization = req.header("authorization");
    try{
        if(!authorization){
            res.send({
            error: "Error",
            message: "You must be logged in to perform this action",
            name: "Error"
            });        
        }
        else{
        const deleteRoutines = await destroyRoutine( routineId);
        res.send(deleteRoutines);
        }
    }
    catch(error){
        next(error);
    }
} )

// POST /api/routines/:routineId/activities
router.post('/:routineId/activities', async (req, res, next) => {
    console.log('this is params for POSt:', req.params);
    console.log('this is body for POSR:', req.body)
   
    
})



module.exports = router;
