const {Sequelize} = require('sequelize')
require('dotenv').config()  

const sequelize = new Sequelize
(
  process.env.POSTGRES_DATABASE_NAME, 
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
        host : 'localhost',
        dialect : 'postgres',
        logging : false
  }
)

module.exports = sequelize