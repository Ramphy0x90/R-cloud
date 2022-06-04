const express = require('express')
const router = express.Router()
const model = require('../models/user')

router.route('/:id').get((req, res, next) => {
    model.findById(req.id, (error, data) => {
        if(error) return next(error);
        else res.json(data);
    })
});

module.exports = router;