import express from "express";
import { Privileges } from "../db/models";

const router = express.Router();

router.get('/', (req, res) => {
    Privileges.findAll().then(privileges => {
        res.json(privileges);
    })
});

router.get('/:id', (req, res) => {
    Privileges.findByPk(req.params.id).then(privileges => {
        res.json(privileges);
    })
});

router.get('/user/:id', (req, res) => {
    Privileges.findAll({
        where: {userId: req.params.id},
    }).then(privileges => {
        res.json(privileges);
    })
});

router.put('/:id', (req, res) => {
    Privileges.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    let privileges = req.body;
    if (privileges.id) {
        delete privileges.id;
    }
    Privileges.create(req.body).then(privileges => {
        res.json(privileges);
    })
});

router.delete('/:id', (req, res) => {
    Privileges.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })

});

module.exports = router;
