import express from "express";
import { Checklist } from "../db/models";
import { Checklistquestion } from "../db/models";
// import { Asset } from "../db/models";
// import { Issue } from "../db/models";

const router = express.Router();

router.get('/checklist/:checklistId', (req, res) => {
    Checklistquestion.findAll({
        where: {checklistId: req.params.checklistId},
    }).then(checklistquestions => {
        res.json(checklistquestions);
    })
});

// router.get('/project/:projectId', (req, res) => {
//     Checklist.findAll({
//         where: {projectId: req.params.projectId},
//         include: [{
//             model: Asset,
//             attributes:['id', 'tag',],
//             as: 'asset',
//           }],
//     }).then(checklists => {
//         res.json(checklists);
//     })
// });

router.get('/:id', (req, res) => {
    Checklistquestion.findByPk(req.params.id).then(checklistquestion => {
        res.json(checklistquestion);
    })

});

router.put('/:id', (req, res) => {
    // console.log(req.body);
    const checklistquestion = {
        id: req.body.id,
        checklistId: req.body.checklistId,
        questionNumber: req.body.questionNumber,
        questionText: req.body.questionText,
        answerReview: req.body.answerReview,
        answerDesign: req.body.answerDesign,
        answerSubmittal: req.body.answerSubmittal,
        answerDelivered: req.body.answerDelivered,
        answerCxa: req.body.answerCxa,
        contractorYesNo: req.body.contractorYesNo,
        cxaYesNo: req.body.cxaYesNo,
        complete: req.body.complete,
        notes: req.body.notes
      };
    // console.log(checklistquestion);
    Checklistquestion.update(checklistquestion, {where: {id: checklistquestion.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    // let checklistquestion = req.body;
    // console.log(checklistquestion);
    Checklistquestion.create(req.body).then(checklistquestion => {
        res.json(checklistquestion);
    })
});

router.delete('/:id', (req, res) => {
    Checklistquestion.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })
});

// router.post('/addquestion', (req, res) => {
//     let question = req.body;
//     console.log(question);
//     Checklistquestion.create(req.body).then(question => {
//         res.json(question);
//     })
// });

// router.put('/updatequestion', (req, res) => {
//     console.log(req);
//     Checklistquestion.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
//         res.json(model.dataValues);
//     })
// });

router.delete('/question/:id', (req, res) => {
    // console.log(req);
    Checklistquestion.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })
});

module.exports = router;
