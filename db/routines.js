const { attachActivitiesToRoutines } = require("./activities");
const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal}){
  try {
    const {rows: [routine]} = await client.query(
      `
      INSERT INTO routines ("creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `, [creatorId, isPublic, name, goal]
    )
    return routine
  } catch (error) {
    console.log(error)
  }
}

async function getRoutineById(id) {
 try {
  const {rows: [routine]} = await client.query(
    `
    SELECT "creatorId", "isPublic", name, goal FROM routines
    WHERE id= $1
    `, [id]
  )
  return routine
 } catch (error) {
  console.log(error)
 }
}

async function getRoutinesWithoutActivities() {
 try{
  const {rows} = await client.query(
    `SELECT * FROM routines;`
  );
  return rows;
 } catch (error){
  console.error("Error!")
  throw error;
 }
}

async function getAllRoutines() {
  try{
    const {rows} = await client.query(
      `SELECT routines.*, count, duration, activities.name as "activityName", routine_activities.id as "routineActivityId", activities.id as "activityId", description, username as "creatorName"
      FROM routines
        JOIN routine_activities ON routines.id = routine_activities."routineId"
        JOIN activities ON activities.id = routine_activities."activityId"
        JOIN users ON routines."creatorId" = users.id
      `
    );
   let routines =  await attachActivitiesToRoutines(rows);

   routines = Object.values(routines)
   console.log("returning allRoutines",routines)
   return routines
  }catch (error){
    console.log(error)
  }
  }
 


async function getAllPublicRoutines() {
  try{
    const {rows} = await client.query(
      `SELECT routines.*, count, duration, activities.name as "activityName", routine_activities.id as "routineActivityId", activities.id as "activityId", description, username as "creatorName"
      FROM routines
        JOIN routine_activities ON routines.id = routine_activities."routineId"
        JOIN activities ON activities.id = routine_activities."activityId"
        JOIN users ON routines."creatorId" = users.id
        WHERE "isPublic" = 'true' 
      `
    );
   let routines =  await attachActivitiesToRoutines(rows);
   routines = Object.values(routines)
   console.log("returning allRoutines",routines)
   return routines
  }catch (error){
    console.log(error)
  }
}

async function getAllRoutinesByUser({ username }) {
  try{
    const {rows} = await client.query(
      `SELECT routines.*, count, duration, activities.name as "activityName", routine_activities.id as "routineActivityId", activities.id as "activityId", description, username as "creatorName"
      FROM routines
        JOIN routine_activities ON routines.id = routine_activities."routineId"
        JOIN activities ON activities.id = routine_activities."activityId"
        JOIN users ON routines."creatorId" = users.id
        WHERE username = $1
      `,[username]
    );
   let routines =  await attachActivitiesToRoutines(rows);

   routines = Object.values(routines)
   console.log("returning allRoutines",routines)
   return routines
  }catch (error){
    console.log(error)
  }
}

async function getPublicRoutinesByUser({ username }) { 
  try{
    const {rows} = await client.query(
      `SELECT routines.*, count, duration, activities.name as "activityName", routine_activities.id as "routineActivityId", activities.id as "activityId", description, username as "creatorName"
      FROM routines
        JOIN routine_activities ON routines.id = routine_activities."routineId"
        JOIN activities ON activities.id = routine_activities."activityId"
        JOIN users ON routines."creatorId" = users.id
        WHERE "isPublic" = 'true' AND username = $1
      `, [username]
    );
   let routines =  await attachActivitiesToRoutines(rows);
   routines = Object.values(routines)
   console.log("returning allRoutines",routines)
   return routines
  }catch (error){
    console.log(error)
  }
   }
  



async function getPublicRoutinesByActivity({ id }) {
  try{
    const {rows} = await client.query(
      `SELECT routines.*, count, duration, activities.name as "activityName", routine_activities.id as "routineActivityId", activities.id as "activityId", description, username as "creatorName"
      FROM routines
        JOIN routine_activities ON routines.id = routine_activities."routineId"
        JOIN activities ON activities.id = routine_activities."activityId"
        JOIN users ON routines."creatorId" = users.id
        WHERE "isPublic" = 'true' AND id = $1
      `, [id]
    );
   let routines =  await attachActivitiesToRoutines(rows);
   routines = Object.values(routines)
   console.log("returning allRoutines",routines)
   return routines
  }catch (error){
    console.log(error)
  }

}

async function updateRoutine({ id, ...fields}) {
  const setFields = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index +1}`
   ).join(', ');
    try {
      const {rows: [routine]} = await client.query(
        `
        UPDATE routines
        SET ${setFields}
        WHERE id= ${id}
        RETURNING * ;
        `, Object.values(fields)
      );
      return routine;
    } catch (error) {
      console.log(error)
    }
}



//async function destroyRoutine(id) {}


module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine
  //destroyRoutine
}
