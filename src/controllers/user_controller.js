//import sequelize
var Sequelize = require('sequelize');
//import Model
const UserModel = require('../lib/models/users/user_model');

exports.getAllUsers = async (req, res) => {

    const userList = await UserModel.findAll()
    .then(function(data){
      const res = { success: true, data: data }
      return res;
    })
    .catch(error =>{
      const res = { success: false, error: error }
      return res;
    })
    res.json(userList);
  
}

exports.getUserById = async ( req, res) =>{

    try {
  
      const { id } = req.params;
  
      const oneUser = await UserModel.findAll({
        where: { id: id}
      })
      .then( function(data){
        const res = { success: true, data: data }
        return res;
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res;
      })
      res.json(oneUser);
  
    } catch (e) {
      console.log(e);
    }
}

exports.updateUserById = async ( req, res) =>{

  try{
    let userId = req.params.id;
    let user = await UserModel.findByPk(userId);

    if(!user){
        // return a response to client
        res.status(404).json({
            message: "Not Found for updating a user with id = " + userId,
            user: "",
            error: "404"
        });
    } else {    
        // update new change to database
        let updatedObject = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            role: req.body.role
        }
        let result = await UserModel.update(updatedObject, {returning: true, where: {id: userId}});
        
        // return the response to client
        if(!result) {
            res.status(500).json({
                message: "Error -> Can not update a user with id = " + req.params.id,
                error: "Can NOT Updated",
            });
        }

        res.status(200).json({
            message: "Update successfully a user with id = " + userId,
            user: updatedObject,
        });
    }
} catch(error){
    res.status(500).json({
        message: "Error -> Can not update a user with id = " + req.params.id,
        error: error.message
    });
}

}

exports.deleteUserById = async ( req, res) =>{

    try {
  
      const { id } = req.params;
  
      const userToDelete = await UserModel.destroy({
        where: { id: id }
      })
      .then( function(data){
        const res = { success: true, data: data, message:"Deleted successful" }
        return res;
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res;
      })
      res.json(userToDelete);
  
    } catch (e) {
      console.log(e);
    }
}

  
 