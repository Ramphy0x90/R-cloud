const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const multer = require('multer')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let userId = (req.user.id) ? req.user.id : '';
        let uploadPath = path.join('./public/', userId, req.query.path);

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

let upload = multer({storage: storage});

router.route('/fetch/:path?').get((req, res, next) => {
    let folderPath = path.join(`./public/${req.user.id}`, (req.query.path ? req.query.path : '/'));
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

router.route('/new').post(async (req, res) => {
    let {folderRefPath, folderName} = req.query;
    let folderPath = path.join(`./public/${req.user.id}`, folderRefPath, folderName);

    if(!fs.existsSync(folderPath)){
        fs.mkdir(folderPath, {recursive: true}, (fsError) => {
            if(fsError) next(fsError);
            res.status(200).json({msg: 'Folder created'});
        });
    } else {
        res.json({msg: 'Folder already exists'});
    }
});

router.route('/upload/:path?').post(upload.single('file'), (req, res, next) => {
    if(req.file) res.json({success: true});
    else res.json({success: false});
});

router.route('/download/').get((req, res, next) => {
    let itemPath = path.join(`./public/${req.user.id}`, (req.query.item));

    if(fs.lstatSync(itemPath).isDirectory()) {
        const childProcess = require('child_process');

        childProcess.execSync(`zip -r archive *`, {cwd: itemPath});
        res.download(itemPath + '.zip');
    } else {
        res.download(itemPath, function(err) {
            if(err) next(err);
        });
    }
});

router.route('/:path?').delete((req, res, next) => {
    let folderPath = path.join('./public/user-id', req.body.path);

    fs.rm(folderPath, {recursive: true}, (fsError) => {
        if(fsError) next(fsError);
        res.status(200).json({msg: 'Folder removed'});
    });
});

module.exports = router;