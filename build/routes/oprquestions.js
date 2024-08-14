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

router.get('/', function (req, res) {
  _models.Oprquestion.findAll().then(function (oprquestions) {
    res.json(oprquestions);
  });
});
router.get('/all/:id', function (req, res) {
  // console.log(req.body)
  _models.Oprquestion.findAll({
    where: {
      oprId: req.params.id
    }
  }).then(function (oprquestions) {
    res.json(oprquestions);
  });
});
router.get('/:id', function (req, res) {
  _models.Oprquestion.findByPk(req.params.id, {// include: [{
    //   model: Checklist,
    //   attributes:['id', 'title', 'percentComplete'],
    //   as: 'checklists',
    // },
    // {
    //     model: Fpt,
    //     attributes:['id', 'title', 'percentComplete'],
    //     as: 'fpts',
    // }],
  }).then(function (oprquestion) {
    res.json(oprquestion);
  });
});
router.put('/', function (req, res) {
  _models.Oprquestion.update(req.body, {
    where: {
      id: req.body.id
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
  var oprquestion = req.body; // console.log(oprquestion);

  _models.Oprquestion.create(req.body).then(function (oprquestion) {
    res.json(oprquestion);
  });
});
router["delete"]('/:id', function (req, res) {
  _models.Oprquestion.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (response) {
    res.json(response);
  });
});
module.exports = router;