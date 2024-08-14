import express from "express";
import { Checklist } from "../db/models";
import { Checklistquestion } from "../db/models";
import { Asset } from "../db/models";
import { Issue } from "../db/models";
import { User } from "../db/models";
import { Project } from "../db/models";

const router = express.Router();

router.get('/asset/:assetId', (req, res) => {
    Checklist.findAll({
        where: {assetId: req.params.assetId},
    }).then(checklists => {
        res.json(checklists);
    })
});

router.get('/project/:projectId', (req, res) => {
    Checklist.findAll({
        where: {projectId: req.params.projectId},
        include: [{
            model: Asset,
            attributes:['id', 'tag',],
            as: 'asset',
          }],
    }).then(checklists => {
        res.json(checklists);
    })
});

router.get('/:id', (req, res) => {
    Checklist.findByPk(req.params.id, {
        include: [
            {
                model: Asset,
                attributes:['id', 'tag', 'title'],
                as: 'asset',
                include:[{
                    model: Checklist,
                    attributes:['id', 'title', 'percentComplete'],
                    as: 'checklists'
                    }
                ]
            },
            {
                model:Issue,
                attributes: ['id', 'title', 'status', 'priority'],
                as: 'issues'
            },
            {
                model: Checklistquestion,
                as: 'questions'
            }
        ],
      }).then(checklist => {
        res.json(checklist);
    })

});

router.put('/:id', (req, res) => {
    Checklist.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    let checklist = req.body;
    console.log(checklist);
    Checklist.create(req.body).then(checklist => {
        res.json(checklist);
    })
});

router.delete('/:id', (req, res) => {
    Checklist.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })
});

router.post('/addquestion', (req, res) => {
    let question = req.body;
    // console.log(question);
    Checklistquestion.create(req.body).then(question => {
        res.json(question);
    })
});

router.put('/updatequestion', (req, res) => {
    console.log(req);
    Checklistquestion.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.delete('/question/:id', (req, res) => {
    // console.log(req);
    Checklistquestion.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })
});

module.exports = router;
