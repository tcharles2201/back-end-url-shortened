module.exports = (sequelize, Sequelize) => {
   const User = sequelize.define("user", {
      user_id:{
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
      role: { type: Sequelize.ENUM('Admin', 'User') },
      role: {
       type: Sequelize.ENUM,
       values: ['Admin', 'User']
     },
      // Column: Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
   });
 
   return User;
 };