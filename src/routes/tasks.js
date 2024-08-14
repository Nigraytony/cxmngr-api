import express from "express";
import { Task } from "../db/models";
// import { User } from "../db/models";
// import { Contact } from "../db/models";
// import { Project } from "../db/models";

const router = express.Router();

router.get('/all/:defaultProject', (req, res) => {
    Task.findAll({
        where: {projectId: req.params.defaultProject},
        order: [
            ['wbs', 'ASC'],
        ],
    }).then(tasks => {
        res.json(tasks);
    })

});

router.get('/:id', (req, res) => {
    Task.findByPk(req.params.id).then(task => {
        res.json(task);
    })

});

router.put('/:id', (req, res) => {
    // console.log(req)
    Task.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    // console.log(req.body)
    let task = req.body;
    // console.log(task);
    Task.create(req.body).then(task => {
        res.json(task);
    })

});

router.delete('/:id', (req, res) => {
    Task.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })

});

module.exports = router;
