const express = require("express");
const router = express.Router();

const Task = require('../models/task');

//LIST TASK
router.get('/', async (req, res) => {

    const tasks = await Task.find();
    res.json(tasks);

});

//SHOW ONE TASK
router.get('/:id', async (req, res) => {

    const task = await Task.findById(req.params.id, req.body);
    res.json(task);


});

//ADD TASK
router.post('/', async (req, res) => {

    const task = new Task(req.body);
    await task.save();
    res.json({ status: 'Task Saved' });

});

//UPDATE TASK
router.put('/:id', async (req, res) => {

    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({ status: 'Task Updated' });

});

//REMOVE TASK
router.delete('/:id', async (req, res) => {

    await Task.findByIdAndRemove(req.params.id, req.body);
    res.json({ status: 'Task Deleted' });

});


//ESPORT ROUTES
module.exports = router;