import express from "express";
import { Opr, Oprquestion, Oprresponse, Oprballot } from "../db/models";
import oprballot from "../db/models/oprballot";

const router = express.Router();

router.get('/', (req, res) => {
    Opr.findAll().then(oprs => {
        res.json(oprs);
    })
});

router.get('/project/:id', (req, res) => {
    Opr.findOne({
        where: {projectId: req.params.id},
        include: [{
            model: Oprquestion,
            as: 'questions',
            include: [
                {
                    model: Oprresponse,
                    as: 'oprresponses',
                },
                {
                    model: Oprballot,
                    as: 'oprballots'
                }
            ]
          }]
    }).then(oprs => {
        res.json(oprs);
    })
});

// router.get('/:id', (req, res) => {
//     Opr.findByPk(req.params.id, {
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
//       }).then(opr => {
//         res.json(opr);
//     })
// });

// router.get('/:id', (req, res) => {
//     Opr.findByPk({
//         where: {projectId: req.params.id},
//     }).then(opr => {
//         res.json(opr);
//     })
// });

router.put('/:id', (req, res) => {
    // console.log(req);
    Opr.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    // let opr = req.body;
    // console.log(req.body);
    Opr.create(req.body).then(opr => {
        res.json(opr);
        }) 
});

router.delete('/:id', (req, res) => {
    Opr.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })
});

module.exports = router;
