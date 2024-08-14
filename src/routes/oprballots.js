import express from "express";
import { Oprballot, Oprresponse } from "../db/models";

const router = express.Router();

router.get('/all/:defaultProject', (req, res) => {
    Oprballot.findAll({
        where: {projectId: req.params.defaultProject},
    }).then(oprballots => {
        res.json(oprballots);
    })

});

router.get('/:id', (req, res) => {
    Oprballot.findByPk(req.params.id, {
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
      }).then(oprballot => {
        res.json(oprballot);
    })
});

router.put('/:id', (req, res) => {
    Oprballot.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    // let oprballot = req.body;
    // console.log(req);
    if(req.body.first){
        Oprballot.create({
            userId: req.body.userId,
            oprQuestionId: req.body.oprQuestionId,
            oprResponseId: req.body.first,
            rank: 5
        }).then((oprballot) => {
            Oprresponse.findByPk(oprballot.oprResponseId).then((oprresponse) => {
                const updatedScore = oprresponse.score + 5;
                oprresponse.update({score: updatedScore});
            });
        })
    }
    if(req.body.second){
        Oprballot.create({
            userId: req.body.userId,
            oprQuestionId: req.body.oprQuestionId,
            oprResponseId: req.body.second,
            rank: 4
        }).then((oprballot) => {
            Oprresponse.findByPk(oprballot.oprResponseId).then((oprresponse) => {
                const updatedScore = oprresponse.score + 4;
                oprresponse.update({score: updatedScore});
            });
        })
    }
    if(req.body.third){
        Oprballot.create({
            userId: req.body.userId,
            oprQuestionId: req.body.oprQuestionId,
            oprResponseId: req.body.third,
            rank: 3
        }).then((oprballot) => {
            Oprresponse.findByPk(oprballot.oprResponseId).then((oprresponse) => {
                const updatedScore = oprresponse.score + 3;
                oprresponse.update({score: updatedScore});
            });
        })
    }
    if(req.body.fourth){
        Oprballot.create({
            userId: req.body.userId,
            oprQuestionId: req.body.oprQuestionId,
            oprResponseId: req.body.fourth,
            rank: 2
        }).then((oprballot) => {
            Oprresponse.findByPk(oprballot.oprResponseId).then((oprresponse) => {
                const updatedScore = oprresponse.score + 2;
                oprresponse.update({score: updatedScore});
            });
        })
    }
    if(req.body.fifth){
        Oprballot.create({
            userId: req.body.userId,
            oprQuestionId: req.body.oprQuestionId,
            oprResponseId: req.body.fifth,
            rank: 1
        }).then((oprballot) => {
            Oprresponse.findByPk(oprballot.oprResponseId).then((oprresponse) => {
                const updatedScore = oprresponse.score + 1;
                oprresponse.update({score: updatedScore});
            });
        })
    }
});

router.delete('/:id', (req, res) => {
    Oprballot.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })
});

module.exports = router;