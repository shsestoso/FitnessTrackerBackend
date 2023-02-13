const express = require('express');
const { createActivity } = require('../db');
const router = express.Router();
const {getPublicRoutinesByActivity, getAllActivities, updateActivity} = ('../db')

// GET /api/activities/:activityId/routines
router.get("/:activityId/routines", async(req, res, next) => {
   const {activityId} = req.params;
   try {
    const routines = await getPublicRoutinesByActivity(activityId);
    if(!routines.length){
        res.status(401).send({message: "Error", error: "Any string", name: "Anne"})
    }
    res.send(routines)
   } catch (error) {
    next (error)
   }
})
// GET /api/activities
router.get('/', async(req, res, next) => {
 try {
    const activities = await getAllActivities();
 res.send(activities)
 } catch (error) {
    next(error)
 }
})

// POST /api/activities
router.post('/', async(req, res, next) => {
    console.log('this is post:', req.body)
    const {name, description} = req.body;
    try {
        const activities = await createActivity({name, description});
        res.send(activities)
    } catch (error) {
        next(error)
    }
})

// PATCH /api/activities/:activityId
router.patch('/:activityId', async(req, res, next) => {
    console.log('this is params for patch:', req.params);
    console.log('this is body for patch', req.body)
    const {activityId} = req.params;
    const {name, description} = req.body;

    const updateFields = {};

    if(name){
        updateFields.name = name;
    }
    if (description){
        updateFields.description = description;
    }
    try {
        const updatingActivities = await updateActivity({activityId})
        if(!updatingActivities.length) {
            res.send({error: "Error updating activities", message: " ", name: "Sean"})
        }
        res.send(updatingActivities)
    } catch (error) {
        next(error)
    }
})
module.exports = router;
