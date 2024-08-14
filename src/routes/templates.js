import express from "express";
import { Template } from "../db/models";
// import { User } from "../db/models";
// import { Project } from "../db/models";

const router = express.Router();

router.get('/project/:id', (req, res) => {
    Template.findAll({
        where: {projectId: req.params.id},
    }).then(templates => {
        res.json(templates);
    })
});

router.get('/user/:id', (req, res) => {
    Template.findAll({
        where: {userId: req.params.id},
    }).then(templates => {
        res.json(templates);
    })
});

router.get('/:id', (req, res) => {
    Template.findByPk(req.params.id).then(template => {
        res.json(template);
    })

});

router.put('/:id', (req, res) => {
    // console.log(req)
    Template.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    // console.log(req.body)
    let template = req.body;
    // console.log(template);
    Template.create(req.body).then(template => {
        res.json(template);
    })

});

router.delete('/:id', (req, res) => {
    Template.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })

});

module.exports = router;
