const express = require('express');
const router = express.Router();

const { gettask, findDb, createTask, updateTask, deleteTask } = require('../controllers/task');

router.get('/', gettask);

router.get('/:id', findDb);

router.post('/', createTask);

router.put('/:id', updateTask);

router.delete('/:taskId', deleteTask)

module.exports = router;
