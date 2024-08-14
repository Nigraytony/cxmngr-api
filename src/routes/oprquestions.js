import express from "express";
import { Oprquestion } from "../db/models";

const router = express.Router();

router.get('/', (req, res) => {
    Oprquestion.findAll().then(oprquestions => {
        res.json(oprquestions);
    })
});

router.get('/all/:id', (req, res) => {
    // console.log(req.body)
    Oprquestion.findAll({
        where: {oprId: req.params.id},
    }).then(oprquestions => {
        res.json(oprquestions);
    })
});

router.get('/:id', (req, res) => {
    Oprquestion.findByPk(req.params.id, {
        // include: [{
        //   model: Checklist,
        //   attributes:['id', 'title', 'percentComplete'],
        //   as: 'checklists',
        // },
        // {
        //     model: Fpt,
        //     attributes:['id', 'title', 'percentComplete'],
        //     as: 'fpts',
        // }],
      }).then(oprquestion => {
        res.json(oprquestion);
    })
});

router.put('/', (req, res) => {
    Oprquestion.update(req.body, {where: {id: req.body.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    let oprquestion = req.body;
    // console.log(oprquestion);
    Oprquestion.create(req.body).then(oprquestion => {
        res.json(oprquestion);
    })
});

router.delete('/:id', (req, res) => {
    Oprquestion.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })
});

module.exports = router;
