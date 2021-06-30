const express = require('express');
const router = express.Router();

const { gettask, findDb, createTask, updateTask, deleteTask } = require('../controllers/task');

router.get('/task', gettask);

router.get('/findDb', findDb);

router.post('/create', createTask);

router.put('/update/:id', updateTask);

router.delete('/delete/:id', deleteTask)

module.exports = router;