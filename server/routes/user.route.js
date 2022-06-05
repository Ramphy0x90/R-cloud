const express = require('express')
const router = express.Router()
const model = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.route('/:id').get((req, res, next) => {
    model.findById(req.params.id, (error, data) => {
        if(error) return next(error);
        else res.json(data);
    })
});

router.route('/login').post(async (req, res) => {
    let {userName, password} = req.body;
    let user = await model.findOne({userName});

    if(user && (await bcrypt.compare(password, user.password))) {
        let token = jwt.sign(
            {userId: user._id, userName},
            'secret',
            {expiresIn: '2h'}
        );
    
        user.token = token;

        res.status(200).json(user);
    } else {
        res.status(404).send('User not found');
    }

});

router.route('/register').post(async (req, res) => {
    let {userName, password} = req.body;
    let checkUserExists = await model.findOne({userName});

    if(checkUserExists) res.status(409).send('User already exists');

    let encryptedPassword = await bcrypt.hash(password, 10);

    let newUser = await model.create({
        userName: userName, 
        password: encryptedPassword
    });

    let token = jwt.sign(
        {userId: newUser._id, userName},
        'secret',
        {expiresIn: '2h'}
    );

    newUser.token = token;

    res.status(201).json(newUser);
});

module.exports = router;