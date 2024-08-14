import express from "express";
import { Contact } from "../db/models";
// import { User } from "../db/models";
// import config from "../config";
// import fs from "fs";
// import path from "path";

const router = express.Router();

router.get('/', (req, res) => {
    Contact.findAll().then(contacts => {
        res.json(contacts);
    })

});

router.get('/:userId', (req, res) => {
    var contact = Contact.findOne({where: { userId: req.params.userId }}).then(contact => {
        res.json(contact);
    })
});

router.put('/:id', (req, res) => {
    Contact.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    let contact = req.body;
    if (contact.id) {
        delete contact.id;
    }
    Contact.create(req.body).then(contact => {
        res.json(contact);
    })
});

router.delete('/:id', (req, res) => {
    Contact.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })
});

module.exports = router;
