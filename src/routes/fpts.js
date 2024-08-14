import express from "express";
import { Fpt } from "../db/models";
import { Asset } from "../db/models";
import { Issue } from "../db/models";
import { User } from "../db/models";
import { Project } from "../db/models";

const router = express.Router();

router.get('/all/:assetId', (req, res) => {
    Fpt.findAll({
        where: {assetId: req.params.assetId},
    }).then(fpts => {
        res.json(fpts);
    })

});

router.get('/project/:projectId', (req, res) => {
    Fpt.findAll({
        where: {projectId: req.params.projectId},
        include: [{
            model: Asset,
            attributes:['id', 'tag',],
            as: 'asset',
          }],
    }).then(fpts => {
        res.json(fpts);
    })
});

router.get('/asset/:assetId', (req, res) => {
    Fpt.findAll({
        where: {assetId: req.params.assetId},
        include: [{
            model: Asset,
            attributes:['id', 'tag', 'title', 'location'],
            as: 'asset',
          }],
    }).then(fpts => {
        res.json(fpts);
    })
});

router.get('/:id', (req, res) => {
    Fpt.findByPk(req.params.id, {
        include: [{
          model: Asset,
          attributes:['id', 'tag', 'title'],
          as: 'asset'
        },
        {
            model:Issue,
            attributes: ['id', 'title', 'status', 'priority'],
            as: 'issues'
        }],
      }).then(fpt => {
        res.json(fpt);
    })

});

router.put('/:id', (req, res) => {
    Fpt.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    let fpt = req.body;
    console.log(fpt);
    Fpt.create(req.body).then(fpt => {
        res.json(fpt);
    })

});

router.delete('/:id', (req, res) => {
    Fpt.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })

});

module.exports = router;
