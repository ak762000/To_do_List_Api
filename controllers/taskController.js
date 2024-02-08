const Task = require('../models/Task')
const async_handler = require('express-async-handler')
const User = require('../models/User')

const createTask = async_handler(async (req, res) => {
    const { description, status, dueDate } = req.body
    const userId = req.user._id

    const task = await Task.create({
        description: description,
        status : status,
        dueDate: dueDate,
        userId : userId 
    });

    res.status(200).json({ data: task, message: "Task created successfully!" });
});

const getTasks = async_handler(async (req, res) => {

    const tasks = await Task.findAll()
    const totalTasks = await Task.count();

    if (tasks.length === 0) {
        return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json({
        data: tasks,
        totalTasks: totalTasks,
        message: "All tasks found!"
    });
});

const getTaskById = async_handler(async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findOne({ where : { id: taskId}})
    
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ data: task, message: "Task found for the specified ID" });
});

const getTaskByUserId = async_handler(async(req,res)=>{
    const userId = req.params.id
    const user_id_task = await Task.findAll({ where : { userId : userId}})
    if(user_id_task.length === 0){
        return res.status(404).json({ message : 'Tasks not found for the specific user id '})
    }
    res.status(200).json({data : user_id_task, message : 'Tasks retrieved successfully for the specific user id ' })
})

const updateTask = async_handler(async (req, res) => {
    const {description, status, dueDate} = req.body;

    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    await Task.update({ description, status, dueDate }, 
        {
            where: {
                id: taskId
                }
        });

    const updatedTask = await Task.findByPk(taskId);

    res.status(200).json({ data: updatedTask, message: "Task updated successfully!" });
});

const deleteTask = async_handler(async(req,res)=>{
    const TaskID = req.params.id
    if(!TaskID){
        return res.status(404).json({ message : 'Task ID not found'})
    }
    const deleteTask_byID = await Task.destroy({ where : { id : TaskID}})
    res.status(200).json({ message : 'Task Deleted successfully !'})
})



module.exports = {createTask, getTasks, getTaskById, getTaskByUserId, updateTask, deleteTask}