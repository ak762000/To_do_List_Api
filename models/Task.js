const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const User = require('../models/User')

const Task = sequelize.define('Task',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    description : {
        type : DataTypes.STRING,
        allowNull : false
    },
    status : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false
    },
    dueDate : {
        type : DataTypes.DATE,
        allowNull : false
    }
})

Task.belongsTo(User, { foreignKey : 'userId'})

module.exports = Task