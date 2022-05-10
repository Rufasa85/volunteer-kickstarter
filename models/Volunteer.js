const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class Volunteer extends Model {}

Volunteer.init({
    // add properites here, ex:
    username: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true
    },
    password:{
        type: DataTypes.STRING,
         allowNull:false,
         validate:{
             len:[8]
         }
    }
},{
    hooks:{
        beforeCreate:userObj=>{
            userObj.password=bcrypt.hashSync(userObj.password,5);
            return userObj
        }
    },
    sequelize
});

module.exports=Volunteer