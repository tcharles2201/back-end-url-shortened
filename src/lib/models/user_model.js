const Sequelize = require('sequelize')
const sequelize = require('../../db/db_connection')
const User = sequelize.define('user', {
   id:{
      type:Sequelize.INTEGER,
      // Increment the value automatically
      autoIncrement:true,
      // user_id can not be null.
      allowNull:false,
      // To uniquely identify user
      primaryKey:true
   },

   firstname: { type: Sequelize.STRING, allowNull:false },
   lastname: { type: Sequelize.STRING, allowNull:false },
   email: { type: Sequelize.STRING, allowNull:false },
   password: { type: Sequelize.STRING, allowNull:false},
   role: {
    type: Sequelize.STRING,
    validate: { isIn: [['Admin', 'User']]}
  },
   // Column: Timestamps
}, { 
     createdAt: "created_at",
     updatedAt: "updated_at"
})
module.exports = User