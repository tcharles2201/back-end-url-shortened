// import sequelize
const Sequelize = require('sequelize');
 
// create connection
const db = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS,    
    {
        host: 'localhost',
        dialect: 'mysql'
    });
db.sync()

module.exports = db;