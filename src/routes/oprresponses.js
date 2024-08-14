import express from "express";
import { Oprresponse } from "../db/models";

const router = express.Router();

router.get('/all/:defaultProject', (req, res) => {
    Oprresponse.findAll({
        where: {projectId: req.params.defaultProject},
    }).then(oprresponses => {
        res.json(oprresponses);
    })

});

router.get('/:id', (req, res) => {
    Oprresponse.findByPk(req.params.id, {
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
      }).then(oprresponse => {
        res.json(oprresponse);
    })
});

router.put('/', (req, res) => {
    // console.log(req);
    Oprresponse.update(req.body, {where: {id: req.body.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    });
});

router.post('/', (req, res) => {
    // let oprresponse = req.body;
    // console.log(oprresponse);
    Oprresponse.create(req.body).then(oprresponse => {
        res.json(oprresponse);
    })
});

router.delete('/:id', (req, res) => {
    Oprresponse.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })
});

module.exports = router;
