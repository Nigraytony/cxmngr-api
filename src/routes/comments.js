import express from "express";
import { Comment } from "../db/models";
import { Project } from "../db/models";

const router = express.Router();

router.get('/issue/:id', (req, res) => {
    Comment.findAll({
        where: { issueId: req.params.id }
    }).then(comments => {
        res.json(comments);
    })

});

router.get('/:id', (req, res) => {
    Comment.findByPk(req.params.id).then(comment => {
        res.json(comment);
    })

});

router.put('/:id', (req, res) => {
    Comment.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    let comment = req.body;
    console.log(comment);
    Comment.create(req.body).then(comment => {
        res.json(comment);
    })

});

router.delete('/:id', (req, res) => {
    Comment.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })

});

module.exports = router;
