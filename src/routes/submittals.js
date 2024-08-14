import express from "express";
import { Submittal } from "../db/models";
import { User } from "../db/models";
import { Project } from "../db/models";

const router = express.Router();

router.get('/all/:defaultProject', (req, res) => {
    Submittal.findAll({
        where: {projectId: req.params.defaultProject},
    }).then(submittals => {
        res.json(submittals);
    })

});

router.get('/:id', (req, res) => {
    Submittal.findByPk(req.params.id).then(submittal => {
        res.json(submittal);
    })

});

router.put('/:id', (req, res) => {
    Submittal.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    let submittal = req.body;
    console.log(submittal);
    Submittal.create(req.body).then(submittal => {
        res.json(submittal);
    })

});

router.delete('/:id', (req, res) => {
    Submittal.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })

});

module.exports = router;
