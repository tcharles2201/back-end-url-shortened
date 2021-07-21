const Sequelize = require('sequelize');

//GET ENV VARIABLES FROM
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    });

module.exports = sequelize;