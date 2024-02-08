const express = require('express')
const app = express()
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const db = require('./config/db')

const port = process.env.PORT 

app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', taskRoutes)

app.get('/',(req,res)=>{
    res.json({message : 'Hello World'})
})

//To check if database is connected or not
db.sync().then(result => 
    {   
        app.listen(port,()=>{
            console.log(`Server started at port ${port} and database connected.....`);
        });
    }).catch(err => console.log(err));