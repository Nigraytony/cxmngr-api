import express from "express";
import { Asset, Checklist, Fpt, Issue } from "../db/models";

const router = express.Router();

// for export users to postgres
// router.get('/json', (req, res) => {
//     Asset.findAll().then(assets => {
//         res.json(assets);
//     })
//   });

router.get('/all/:defaultProject', (req, res) => {
    Asset.findAll({
        where: {projectId: req.params.defaultProject},
    }).then(assets => {
        res.json(assets);
    })

});

router.get('/:id', (req, res) => {
    Asset.findByPk(req.params.id, {
        include: [{
          model: Checklist,
          attributes:['id', 'title', 'percentComplete'],
          as: 'checklists',
        },
        {
            model: Fpt,
            attributes:['id', 'title', 'percentComplete'],
            as: 'fpts',
        },
        {
            model: Issue,
            attributes:['id', 'title'],
            as: 'issues',
        }],
      }).then(asset => {
        res.json(asset);
    })

});

router.put('/:id', (req, res) => {
    Asset.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
        res.json(model.dataValues);
    })
});

router.post('/', (req, res) => {
    let asset = req.body;
    console.log(asset);
    // Asset.create(req.body).then(asset => {
    //     res.json(asset);
    // })
});

router.post('/withtemplate', (req, res) => {
    // let asset = req.body;
    // console.log(asset);
    Asset.create(req.body).then(asset => {
        res.json(asset);
    })
});

router.delete('/:id', (req, res) => {
    Asset.destroy({where: {id: req.params.id}}).then(response => {
        res.json(response);
    })

});

module.exports = router;
