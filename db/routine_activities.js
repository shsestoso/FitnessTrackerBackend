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

 async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {
  try {
    const { rows } = await client.query(
      `
      DELETE
      WHERE id=$1
      
      `,
      [id]
    );

    return rows;
  } catch (err) {
    console.log("error")
    throw err;
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const { rows: routineActivities } = await client.query(
      `
      SELECT * FROM routine_activities
      WHERE "routineId"=$1;
      `,
      [routineActivityId, userId]
    );

    return routineActivities;
  } catch (err) {
    console.log("error")
    throw err;
  }
}

module.exports = {
 getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
