const express = require('express');
const router = express.Router()
const folderModel = require('../models/folder')
const path = require('path')
const fs = require('fs')

router.route('/').get((req, res, next) => {
    folderModel.find((error, data) => {
        if(error) return next(error);
        else res.json(data);
    })
});

router.route('/:id').get((req, res, next) => {
    folderModel.findById(req.id, (error, data) => {
        if(error) return next(error);
        else res.json(data);
    })
});

router.route('/new').post((req, res, next) => {
    let folderName = req.body.name;
    let folderPath = path.join('./public/user-id', req.body.path, folderName);

    let data = {
        name: folderName,
        path: folderPath,
        isPrivate: false,
        password: ''
    }

    if(!fs.existsSync(folderPath)){
        fs.mkdir(folderPath, {recursive: true}, (fsError) => {
            if(fsError) {
                console.log(`Folder creation error ${fsError}`);
            } else {
                folderModel.create(data, (error, data) => {
                    if(error) return next(error);
                    else res.json(data);
                });
            }
        });
    } else {
        console.log('Folder already exists');
        res.json({msg: 'Folder already exists'});
    }
})

module.exports = router;