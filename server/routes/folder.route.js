const express = require('express');
const router = express.Router()
const path = require('path')
const fs = require('fs')

router.route('/:path?').get((req, res, next) => {
    let folderPath = path.join(`./public/${res.user.id}`, (req.query.path ? req.query.path : '/'));
    let folderPublicPath = (req.query.path ? req.query.path : '/');
    let folders = {};

    try {
        fs.readdirSync(folderPath).map(fileName => {
            let elementPath = path.join(folderPath, fileName);
            
            folders[fileName] = {
                isDir: fs.lstatSync(elementPath).isDirectory(),
                path: path.join(folderPublicPath, fileName)
            };
        });
    } catch (fsError) {
        return res.status(404).json({msg: 'Folder not found'});
    }

    return res.status(200).json(folders);
});

router.route('/new').post((req, res, next) => {
    let folderName = req.body.name;
    let folderPath = path.join(`./public/${res.user.id}`, req.body.path, folderName);

    if(!fs.existsSync(folderPath)){
        fs.mkdir(folderPath, {recursive: true}, (fsError) => {
            if(fsError) next(fsError);
            res.status(200).json({msg: 'Folder created'});
        });
    } else {
        res.json({msg: 'Folder already exists'});
    }
});

router.route('/:path?').delete((req, res, next) => {
    let folderPath = path.join('./public/user-id', req.query.path);

    fs.rm(folderPath, {recursive: true}, (fsError) => {
        if(fsError) next(fsError);
        res.status(200).json({msg: 'Folder removed'});
    });
});

module.exports = router;