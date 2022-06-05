const express = require('express')
const router = express.Router()
const model = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.config')

router.route('/:id').get((req, res, next) => {
    model.findById(req.params.id, (error, data) => {
        if(error) return next(error);
        else res.json(data);
    })
});

router.route('/login').post(async (req, res) => {
    let {userName, password} = req.body;
    let user = await model.findOne({userName});

    if(!user) res.status(404).send('User not found');

    if(user && (await bcrypt.compare(password, user.password))) {
        let token = jwt.sign(
            {id: user._id, userName},
            authConfig.secret,
            {expiresIn: '2h'}
        );
        
        res.status(200).send({
            id: user._id,
            userName: user.userName,
            accessToken: token
        });
    } else {
        res.status(401).send('Invalid credentials');
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

    res.status(201).json(newUser);
});

module.exports = router;