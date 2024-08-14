import express from "express";
import { Project, User, Projectusers, Privileges } from "../db/models";
// import config from "../config";
// import fs from "fs";
// import path from "path";

const router = express.Router();

// router.get('/images-list', (req, res) => {
//   fs.readdir(path.resolve(process.env.PWD + '/public/assets/projects/'), (err, files) => {
//     files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)).map(f => config.apiUrl + '/assets/projects/' + f);
//     res.json(files);
//   });
// });

router.get('/', (req, res) => {
    Project.findAll().then(projects => {
        res.json(projects);
    })
});

router.get('/:id', (req, res) => {
    Project.findByPk(req.params.id).then(project => {
        res.json(project);
    })
});

router.put('/:id', (req, res) => {
    Project.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    // console.log(req)
    let project = req.body;
    if (project.id) {
        delete project.id;
    }
    Project.create(req.body).then(project => {
        Projectusers.create({
            userId: req.query.user,
            projectId: project.id,
            role: 'cxa',
            status: 'member'
        }).then((projectuser) => {
            Privileges.create({
                projectId: projectuser.projectId,
                userId: projectuser.userId,
                viewProject: true,
                createProject: true,
                editProject: true,
                deleteProject: true,
                viewIssue: true,
                createIssue: true,
                editIssue: true,
                deleteIssue: true,
                viewAsset: true,
                createAsset: true,
                editAsset: true,
                deleteAsset: true,
                viewChecklist: true,
                createChecklist: true,
                editChecklist: true,
                deleteChecklist: true,
                viewFpt: true,
                createFpt: true,
                editFpt: true,
                deleteFpt: true,
            })
        })
        res.json(project);
    })
});

router.get('/image/:id', (req, res) => {
  Project.findByPk(req.params.id).then(project => {
      res.json(project.img);
  })
});

router.delete('/:id', (req, res) => {
    Project.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })

});

module.exports = router;
