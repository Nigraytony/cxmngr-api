import express from "express";
import { Image, User, Project } from "../db/models";
// import { Issue } from "../db/models";
// import { Project } from "../db/models";
import multer from "multer";
const path = require('path');

const router = express.Router();


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().valueOf() + '_' + file.originalname );
    }
  })
  
  var upload = multer({
      storage: storage,
      limits: { fileSize: 5000000 }
    })

router.get('/issue/:id', (req, res) => {
    Image.findAll({
        where: { issueId: req.params.id }
    }).then(images => {
        res.json(images);
    })
});

router.get('/event/:id', (req, res) => {
    Image.findAll({
        where: { eventId: req.params.id }
    }).then(images => {
        res.json(images);
    })
});

router.get('/project/:id', (req, res) => {
    Image.findAll({
        where: { projectId: req.params.id }
    }).then(images => {
        res.json(images);
    })
});

router.get('/:filename', (req, res) => {
    // res.json('filename');
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'uploads/' + filename);
    return res.sendFile(fullfilepath);
});

router.put('/:id', (req, res) => {
    Image.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/profile', upload.single('file'),(req, res) => {
    User.update({ thumbnail: req.file.filename },{ where:{ id:req.body.userId } })
    .then(() => {
        res.json({
            message: "User profile has been updated",
        });
    });
});

router.post('/project/image', upload.single('file'),(req, res) => {
    Project.update({ img: req.file.filename },{ where:{ id:req.body.projectId } })
    .then(() => {
        res.json({
            message: "Project image has been updated",
        });
    });
});

router.post('/single', upload.single('file'),(req, res) => {
    if(req.body.projectId){
        Project.update({ img: req.file.filename },{ where:{ id: req.body.projectId } });
    }
    Image.create({
        projectId: req.body.projectId ? req.body.projectId : null,
        userId: req.body.userId ? req.body.userId : null,
        assetId:  req.body.assetId ? req.body.assetId : null,
        issueId: req.body.issueId ? req.body.issueId : null,
        fptId: req.body.fptId ? req.body.fptId : null,
        submittalId: req.body.submittalId ? req.body.submittalId : null,
        eventId: req.body.eventId ? req.body.eventId : null,
        checklistId: req.body.checklistId ? req.body.checklistId : null,
        title: req.body.title,
        path: req.file.filename,
        status: true
    });
    // console.log(req);
    res.send("Image Uploaded");
});

router.delete('/:id', (req, res) => {
    Image.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })
});

module.exports = router;
