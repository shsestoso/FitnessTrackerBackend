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
    const {rows} = await client.query(`
    SELECT  "routineId", "activityId", count , duration, id
    FROM routine_activities
    WHERE "routineId"=$1;
    `,[id])
    return rows;
  } catch (error) {
    console.log(error);
    
  }
}

 async function updateRoutineActivity({ id, ...fields }) {
  const setFields = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index +1}`
   ).join(', ');
    try {
      const {rows: [routineActivities]} = await client.query(
        `
        UPDATE routine_activities
        SET ${setFields}
        WHERE id= ${id}
        RETURNING * ;
        `, Object.values(fields)
      );
      return routineActivities;
    } catch (error) {
      console.log(error)
    }
 }

async function destroyRoutineActivity(id) {
  try {
    const { rows: [routineActivity] } = await client.query(
      `
      DELETE 
      FROM routine_activities
      WHERE id=$1
      RETURNING *
      `,
      [id]
    );

    return routineActivity;
  } catch (err) {
    console.log("error")
    throw err;
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const { rows: [routineActivities] } = await client.query(
      `
      SELECT "creatorId", routines.id AS "routineId", routine_activities.id 
      FROM routines
      JOIN routine_activities ON routines.id = routine_activities."routineId"
      WHERE routine_activities.id = $1
      `,
      [routineActivityId]
    );

    return routineActivities.creatorId === userId
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
