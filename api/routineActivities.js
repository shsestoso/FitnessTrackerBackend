
const express = require('express');
const { updateRoutineActivity, destroyRoutineActivity } = require('../db');
const router = express.Router();

// PATCH /api/routine_activities/:routineActivityId

router.patch('/:routineActivityId',async(req, res, next) => {
    const authorization = req.header("authorization");
    try{
        if (!authorization){
            res.send({
                error: "Error",
                message: "User Lizzy is not allowed to update In the evening",
                name: "Error"
            })
        }
        else {
            const {count, duration} = req.body;
            const routineActivity = await updateRoutineActivity({
                id: req.params.routineActivityId,
                count, 
                duration
            });
            res.send(routineActivity)
        }
    }catch (error){
        next(error);
    }
} )
// DELETE /api/routine_activities/:routineActivityId

router.delete('/:routineActivityId', async (req, res, next) => {
    const {routineActivityId} = req.params;
    const { password} = req.body;
    const authorization = req.header("authorization")
    try {
        if(!authorization){
            res.send({
                error: "Error",
                message: "You must be logged in to perform this action",
                name: "Error"
            })
        } else {
        const deletingRoutineActivity = await destroyRoutineActivity(routineActivityId, password);
        res.send(deletingRoutineActivity)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router;
