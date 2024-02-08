const express = require('express')
const router = express.Router()
const { createTask, getTasks, getTaskById, getTaskByUserId, updateTask, deleteTask } = require('../controllers/taskController')
const auth = require('../middlewares/auth')

router.use(auth)
router.post('/tasks', createTask)
router.get('/tasks', getTasks)
router.route('/tasks/:id').get(getTaskById).put(updateTask).delete(deleteTask)
router.route('/tasks/user_id/:id').get(getTaskByUserId)




module.exports = router