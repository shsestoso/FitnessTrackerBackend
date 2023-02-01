const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {row: [routine]} = await client.query(
      `
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `, [creatorId, isPublic, name, goal]
    );
    return routine;  
  } catch (error) {
    console.error('Error creating routines!')
    throw error;
  }
}

//async function getRoutineById(id) {}

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

// async function getAllRoutines() {}

// async function getAllPublicRoutines() {}

// async function getAllRoutinesByUser({ username }) {}

// async function getPublicRoutinesByUser({ username }) {}

// async function getPublicRoutinesByActivity({ id }) {}

// async function updateRoutine({ id, ...fields }) {}

// async function destroyRoutine(id) {}

module.exports = {
  //getRoutineById,
  getRoutinesWithoutActivities,
  // getAllRoutines,
  // getAllPublicRoutines,
  // getAllRoutinesByUser,
  // getPublicRoutinesByUser,
  // getPublicRoutinesByActivity,
  createRoutine,
  // updateRoutine,
  // destroyRoutine,
};
