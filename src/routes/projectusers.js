import express from "express";
import bcrypt from "bcrypt";
import config from "../config";
import { Projectusers, Privileges, Project, User } from "../db/models";
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
    Projectusers.findAll().then(projectusers => {
        res.json(projectusers);
    })
});

router.get('/project/:id', (req, res) => {
    Projectusers.findAll({
        where: {projectId: req.params.id},
        include: [{
            model: User,
            attributes:['fullName', 'company'],
            as: 'user',
        }],
    }).then(projectusers => {
        res.json(projectusers);
    })
});

router.get('/user/:id', (req, res) => {
    Projectusers.findAll({
        where: {userId: req.params.id},
        include: [{
            model: Project,
            attributes:['id', 'title'],
            as: 'project',
        }],
    }).then(projectusers => {
        res.json(projectusers);
    })
});

router.put('/:id', (req, res) => {
    Projectusers.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    // console.log(req.body);
    
    User.findOne({
        where: {email: req.body.email},
    }).then((usr) => {
        if(usr){
            Projectusers.findOne({
                where:{
                    userId: usr.id,
                    projectId: req.body.projectId
                }
            }).then((projusr) => {
                if(projusr){
                    res.json({message: "User is already on the team"});
                }
                else
                {
                    Projectusers.create({
                        userId: usr.id,
                        projectId: req.body.projectId,
                        role: req.body.role,
                        status: req.body.status
                    }).then((projectuser) => {
                        Privileges.create({
                            projectId: projectuser.projectId,
                            userId: projectuser.userId,
                            viewProject: true,
                            createProject: false,
                            editProject: false,
                            deleteProject: false,
                            viewIssue: true,
                            createIssue: false,
                            editIssue: false,
                            deleteIssue: false,
                            viewAsset: true,
                            createAsset: false,
                            editAsset: false,
                            deleteAsset: false,
                            viewChecklist: true,
                            createChecklist: false,
                            editChecklist: false,
                            deleteChecklist: false,
                            viewFpt: true,
                            createFpt: false,
                            editFpt: false,
                            deleteFpt: false,
                        })
                        res.json({message: "User has been added to the project"});
                    }) 
                }
            })           
        }
        else {
            res.json({message: "User does not exist in the database. Has the person created a profile?"})
        }
    })

});

router.delete('/:id', (req, res) => {
    console.log(req);
    // Projectusers.destroy({
    //     where: {
    //         userId: req.params.id,
    //         projectId: req.body.projectId
    //     }
    // }).then(response => {
    //     res.json(response);
    // })

});

module.exports = router;
