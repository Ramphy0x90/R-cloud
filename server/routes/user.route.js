const express = require('express')
const router = express.Router()
const model = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.config')
const fs = require('fs')

router.route('/:id').get((req, res, next) => {
    model.findById(req.params.id, (error, data) => {
        if(error) return next(error);
        else res.json(data);
    })
});

router.route('/login').post(async (req, res) => {
    let {userName, password} = req.body;
    let user = await model.findOne({userName});

    if(!user) return res.status(404).json({msg: 'User not found'});

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

        let dir = './public/' + user._id;

        if (!fs.existsSync(dir)) {
            fs.mkdir(dir, {recursive: true}, (fsError) => {
                if(fsError) next(fsError);
            });
        }

    } else {
        return res.status(401).json({msg: 'Invalid credentials'});
    }

});

router.route('/register').post(async (req, res) => {
    let {userName, password} = req.body;
    let checkUserExists = await model.findOne({userName});

    if(checkUserExists) return res.status(409).json({msg: 'User already exists'});

    let encryptedPassword = await bcrypt.hash(password, 10);

    let newUser = await model.create({
        userName: userName, 
        password: encryptedPassword
    });

    fs.mkdir('./public/' + newUser._id, {recursive: true}, (fsError) => {
        if(fsError) next(fsError);
    });

    return res.status(201).json(newUser);
});

module.exports = router;