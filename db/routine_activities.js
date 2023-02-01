const client = require("./client");

// STILL HAVING ERROR HERE. GO BACK WHEN DONE WITH SOME TESTS
async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
   const SQL = await client.query(
    `
    INSERT INTO routine_activities (
      "routineId", "activityId", count, duration
    )
    VALUES ($1, $2, $3, $4 )
    ON CONFLICT ON CONSTRAINT ("routineId", "activityId") DO NOTHING
    RETURNING *;
    `, [ routineId, activityId, count, duration]
   );
   return SQL.rows[0]
  } catch (error) {
    console.log("ERROR BUILTING ROUTINE_ACTIVITIES")
    throw error
  }
}

// async function getRoutineActivityById(id) {}

// async function getRoutineActivitiesByRoutine({ id }) {}

// async function updateRoutineActivity({ id, ...fields }) {}

// async function destroyRoutineActivity(id) {}

// async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
 // getRoutineActivityById,
  addActivityToRoutine,
  // getRoutineActivitiesByRoutine,
  // updateRoutineActivity,
  // destroyRoutineActivity,
  // canEditRoutineActivity,
};
