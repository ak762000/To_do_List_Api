const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const bcrypt = require('bcrypt')

const User = sequelize.define('User', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true 
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
},{
    hooks : {
        beforeCreate : async(user)=>{
            if(user.changed('password')){
                user.password = await bcrypt.hash(user.password, 8)
            }
        },
        beforeUpdate : async(user)=>{
            if(user.changed('password')){
                user.password = await bcrypt.hash(user.password, 8)
            }
          }
    }
})

module.exports = User