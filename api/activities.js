const express = require('express');
const router = express.Router();
const {getPublicRoutinesByActivity, getAllActivities} = ('../db')

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
   const activities = await getAllActivities();
   res.send(activities);
})

// POST /api/activities

// PATCH /api/activities/:activityId
module.exports = router;
