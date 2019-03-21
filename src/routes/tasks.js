const express = require("express");
const router = express.Router();

const Task = require('../models/task');


router.get('/', (req, res) => {
    Task.find();
});


module.exports = router;