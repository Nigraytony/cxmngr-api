import express from "express";
import { Event, Issue } from "../db/models";
// import { User } from "../db/models";
// import { Project } from "../db/models";

const router = express.Router();

router.get('/all/:defaultProject', (req, res) => {
    Event.findAll({
        where: {projectId: req.params.defaultProject},
    }).then(events => {
        res.json(events);
    })

});

router.get('/:id', (req, res) => {
    Event.findByPk(req.params.id, {
        include: [{
            model: Issue,
            as: 'issues',
        }]
    }).then(event => {
        res.json(event);
    })

});

router.put('/:id', (req, res) => {
    Event.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    let event = req.body;
    console.log(event);
    Event.create(req.body).then(event => {
        res.json(event);
    })

});

router.delete('/:id', (req, res) => {
    Event.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })

});

module.exports = router;
