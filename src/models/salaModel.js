
const db = require("./db");
 async function listarSalas() {
 return await db.findAll("sala");
}

module.exports = { listarSalas };