const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const {rows: [user]} = await client.query(`
    INSERT INTO users (username, password)
    VALUES($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `,[username, password]);
    console.log("this is user", user);
    return user;
  }
  catch(error){
    console.error('Error creating users!');
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const {rows} = await client.query(`
    SELECT username, password
    FROM users;
    `, [username, password]);
    return rows;
  } catch (error){
    console.log("Error getUser")
    throw error;
  }
}

//  async function getUserById(userId) {
//   try {
//     const {rows:[user]} = await client.query (
//       `
//       SELECT id, username
//       FROM users
//       WHERE id= ${userId}
//       `);
//       if (!user) {
//         return null
//       }

//      return user;

//   } catch (error) {
//     console.log( "Error getUserById")
//     throw error
//   }

// }

// async function getUserByUsername(userName) {

// }

module.exports = {
  createUser,
  getUser,
  //getUserById,
//   getUserByUsername,
}
