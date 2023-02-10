const client = require('./client');

// database functions
async function createActivity({ name, description }){
  // return the new activity
  try {
    const {rows : [activity]} = await client.query(`
    INSERT INTO activities(name, description)
    VALUES($1, $2)
    RETURNING *;
    `, [name, description]);
    return activity
  } catch (error) {
    console.error("Error creating activities!")
    throw error;
    
  }

}

async function getAllActivities() {
  // select and return an array of all activities
  try {
    const {rows} =  await client.query(
      `
      SELECT * FROM activities
      `);
      return rows;  
  } catch (error) {
    console.log(error)
  }
}

async function getActivityById(id) {
  try {
    const {rows: [activity]} = await client.query(
      `
      SELECT name, description, id FROM activities
      WHERE id=$1
      `, [id]
    )
    return activity  
  } catch (error) {
    console.log(error)
  }
}

async function getActivityByName(name) {
  try {
    const {rows: [activity]} = await client.query(
      `
      SELECT name, description, id FROM activities
      WHERE name=$1
      `, [name]
    )
    return activity
  } catch (error) {
    console.log(error)
  }
}

async function attachActivitiesToRoutines(routines) {
  // select and return an array of all activities
  const routinesById = {};
  routines.forEach((routine) => {
    if (!routinesById[routine.id]) {
      routinesById[routine.id] = {
        id: routine.id,
        creatorId: routine.creatorId,
        creatorName: routine.creatorName,
        isPublic: routine.isPublic,
        name: routine.name,
        goal: routine.goal,
        activities: [],
      };
    }
    const activity = {
      routineActivityId: routine.routineActivityId,
      routineId: routine.id,
      name: routine.activityName,
      id: routine.activityId,
      description: routine.description,
      count: routine.count,
      duration: routine.duration,
    };
    routinesById[routine.id].activities.push(activity);
  });
  return routinesById;
}


async function updateActivity({ id, ...fields }) {

 const setString = Object.keys(fields).map(
  (key, index) => `${key}=$${index +2}`
 ).join(', ');

  // don't try to update the id
  // do update the name and description
  // return the updated activity
  //console.log("this is setstring",setString)
  try {
  const {rows:[activity]} = await client.query(
  
    `
    UPDATE activities 
    SET ${setString}
    WHERE id=$1
    RETURNING *;
    `, [id, ...Object.values(fields)]
  );
  
  return activity
 } catch (error) {
  console.log(error)
 }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}
