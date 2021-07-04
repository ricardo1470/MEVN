#!/usr/bin/node
const Task = require('../models/task');

/* return endpoint to enter the home page */
const gettask = async (req, res) => {
    const resTask = await Task.find({});
    res.json(resTask);
};

const findDb = async (req, res) => {
    const resTask = await Task.findById(req.params.id);
    res.json(resTask);
};

const createTask = async (req, res) => {
    const resTask = new Task(req.body);
    await resTask.save();
    res.json({
        status: 'Task saved'
    });
}

const updateTask = async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Task updated'
    });
};

const deleteTask = async (req, res) => {
    await Task.findByIdAndRemove(req.params.taskId);
    res.json({
        status: 'Task Deleted'
    });
};

/* export functions*/
module.exports = {
    gettask,
    findDb,
    createTask,
    updateTask,
    deleteTask
}