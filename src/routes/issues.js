import express from "express";
import { Issue, Image } from "../db/models";
// import { Comment } from "../db/models";
// import { User } from "../db/models";
// import { Project } from "../db/models";

const router = express.Router();

router.get('/all/:defaultProject', (req, res) => {
    Issue.findAll({
        where: {projectId: req.params.defaultProject},
    }).then(issues => {
        res.json(issues);
    })
});

router.get('/:id', (req, res) => {
    Issue.findByPk(req.params.id).then(issue => {
        res.json(issue);
    })

});

router.put('/:id', (req, res) => {
    Issue.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    let issue = req.body;
    if (issue.id) {
        delete issue.id;
    }
    Issue.create(req.body).then(issue => {
        res.json(issue);
    })
});

router.delete('/:id', (req, res) => {
    Issue.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })

});

module.exports = router;
