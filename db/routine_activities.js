const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const { rows: [routine_activity] } = await client.query(`
    INSERT INTO routine_activities ( "routineId", "activityId", count , duration)
    VALUES($1, $2, $3, $4)
    ON CONFLICT ("routineId", "activityId") DO NOTHING
    RETURNING "routineId", "activityId", count , duration, id;
      `, [ routineId, activityId, count, duration]);
      console.log(routine_activity)
    return routine_activity;
  } catch (error) {
    console.log("ERROR ACTIVITIES_ROUTINE")
  }
}


async function getRoutineActivityById(id) {
try {
  const {rows: [routine_activity]} = await client.query(`
  SELECT "routineId", "activityId", count , duration, id
  FROM routine_activities
  WHERE id=$1
  `, [id])
  return routine_activity;
} catch (error) {
  console.log(error)
}
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const {rows: [routine_activity]} = await client.query(`
    SELECT  "routineId", "activityId", count , duration, id
    FROM routine_activities
    WHERE "routineId"=$1;
    `,[id])
    return routine_activity;
  } catch (error) {
    console.log(error);
    
  }
}

// async function updateRoutineActivity({ id, ...fields }) {}

// async function destroyRoutineActivity(id) {}

// async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
 getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  // updateRoutineActivity,
  // destroyRoutineActivity,
  // canEditRoutineActivity,
};
