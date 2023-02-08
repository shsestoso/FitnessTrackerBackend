const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const {rows: [user]} = await client.query(`
    INSERT INTO users (username, password)
    VALUES($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING username, id;
    `,[username, password]);
    console.log("this is user", user);
    return user;
  }
  catch(error){
    console.error('Error creating users!');
  }
}

async function getUser({ username, password }){
  try {
    const {rows: [user]} = await client.query(
      `
      SELECT username,id FROM users
      WHERE username = $1 AND password = $2
      `, [username, password]
    )
    if(!user){
      throw new Error("Could not get user!")
    }
    return user   
  } catch (error) {
    console.log(error)
  }
}
 

async function getUserById(userId) {
  try {
    const {rows:[user]} = await client.query(
      `
      SELECT username,id FROM users
      WHERE id=$1
      `, [userId]
    )
    console.log("RETURNING USER", user)
    return user
  } catch (error) {
    console.log(error)
    
  }
}

async function getUserByUsername(userName) {
  try {
    const {rows: [user]} = await client.query(
      `SELECT * FROM users
      WHERE username=$1
     `, [userName]
    )
    return user
  } catch (error) {
    console.log(error)
  }

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
