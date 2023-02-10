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
      `SELECT routines.*, count, duration, activities.name as "activityName",  activities.id as "activityId", description, username as "creatorName"
      FROM routines
        JOIN routine_activities ON routines.id = routine_activities."routineId"
        JOIN activities ON activities.id = routine_activities."activityId"
        JOIN users ON "creatorId" = users.id
      `
    );
   let routines =  attachActivitiesToRoutines(rows);
   console.log("returning allRoutines",routines)
  }catch (error){
    console.log(error)
    throw error;
  }
  }
 


async function getAllPublicRoutines() {}

// async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {
   if(!isPublic){
   try {
    const {rows: [routine]} = await client.query(
      `SELECT "creatorId", name, goal, id
      WHERE username = $1`, [username]
    );
    return routine
   } catch (error) {
    console.log(error)
   }
  }
}


// async function getPublicRoutinesByActivity({ id }) {

// }

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
  // getAllRoutinesByUser,
  getPublicRoutinesByUser,
  //getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine
  //destroyRoutine
}
