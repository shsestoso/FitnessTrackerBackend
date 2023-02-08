const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const { rows: [routineActivity] } = await client.query(`
    INSERT INTO routine_activities ( "routineId", "activityId", count , duration)
    VALUES($1, $2, $3, $4)
    ON CONFLICT ("routineId", "activityId") DO NOTHING
    RETURNING *;
      `, [ routineId, activityId, count, duration]);
    return routineActivity;
  } catch (error) {
    console.log("ERROR ACTIVITIES_ROUTINE")
    throw error;
  }
}

<<<<<<< HEAD
// STILL HAVING ERROR HERE. GO BACK WHEN DONE WITH SOME TESTS

async function getRoutineActivityById(id) {

}
=======
async function getRoutineActivityById(id) {}
>>>>>>> refs/remotes/origin/main

async function getRoutineActivitiesByRoutine({ id }) {}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
 getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
