"use strict";

var _express = _interopRequireDefault(require("express"));

var _models = require("../db/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = _express["default"].Router();

router.get('/asset/:assetId', function (req, res) {
  _models.Checklist.findAll({
    where: {
      assetId: req.params.assetId
    }
  }).then(function (checklists) {
    res.json(checklists);
  });
});
router.get('/project/:projectId', function (req, res) {
  _models.Checklist.findAll({
    where: {
      projectId: req.params.projectId
    },
    include: [{
      model: _models.Asset,
      attributes: ['id', 'tag'],
      as: 'asset'
    }]
  }).then(function (checklists) {
    res.json(checklists);
  });
});
router.get('/:id', function (req, res) {
  _models.Checklist.findByPk(req.params.id, {
    include: [{
      model: _models.Asset,
      attributes: ['id', 'tag', 'title'],
      as: 'asset',
      include: [{
        model: _models.Checklist,
        attributes: ['id', 'title', 'percentComplete'],
        as: 'checklists'
      }]
    }, {
      model: _models.Issue,
      attributes: ['id', 'title', 'status', 'priority'],
      as: 'issues'
    }, {
      model: _models.Checklistquestion,
      as: 'questions'
    }]
  }).then(function (checklist) {
    res.json(checklist);
  });
});
router.put('/:id', function (req, res) {
  _models.Checklist.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true,
    plain: true
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        model = _ref2[1];

    res.json(model.dataValues);
  });
});
router.post('/', function (req, res) {
  var checklist = req.body;
  console.log(checklist);

  _models.Checklist.create(req.body).then(function (checklist) {
    res.json(checklist);
  });
});
router["delete"]('/:id', function (req, res) {
  _models.Checklist.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (response) {
    res.json(response);
  });
});
router.post('/addquestion', function (req, res) {
  var question = req.body;
  console.log(question);

  _models.Checklistquestion.create(req.body).then(function (question) {
    res.json(question);
  });
});
router.put('/updatequestion', function (req, res) {
  console.log(req);

  _models.Checklistquestion.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true,
    plain: true
  }).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        model = _ref4[1];

    res.json(model.dataValues);
  });
});
router["delete"]('/question/:id', function (req, res) {
  // console.log(req);
  _models.Checklistquestion.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (response) {
    res.json(response);
  });
});
module.exports = router;