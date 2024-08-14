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

// import config from "../config";
// import fs from "fs";
// import path from "path";
var router = _express["default"].Router(); // router.get('/images-list', (req, res) => {
//   fs.readdir(path.resolve(process.env.PWD + '/public/assets/projects/'), (err, files) => {
//     files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)).map(f => config.apiUrl + '/assets/projects/' + f);
//     res.json(files);
//   });
// });


router.get('/', function (req, res) {
  _models.Project.findAll().then(function (projects) {
    res.json(projects);
  });
});
router.get('/:id', function (req, res) {
  _models.Project.findByPk(req.params.id).then(function (project) {
    res.json(project);
  });
});
router.put('/:id', function (req, res) {
  _models.Project.update(req.body, {
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
  // console.log(req)
  var project = req.body;

  if (project.id) {
    delete project.id;
  }

  _models.Project.create(req.body).then(function (project) {
    _models.Projectusers.create({
      userId: req.query.user,
      projectId: project.id,
      role: 'cxa',
      status: 'member'
    }).then(function (projectuser) {
      _models.Privileges.create({
        projectId: projectuser.projectId,
        userId: projectuser.userId,
        viewProject: true,
        createProject: true,
        editProject: true,
        deleteProject: true,
        viewIssue: true,
        createIssue: true,
        editIssue: true,
        deleteIssue: true,
        viewAsset: true,
        createAsset: true,
        editAsset: true,
        deleteAsset: true,
        viewChecklist: true,
        createChecklist: true,
        editChecklist: true,
        deleteChecklist: true,
        viewFpt: true,
        createFpt: true,
        editFpt: true,
        deleteFpt: true
      });
    });

    res.json(project);
  });
});
router["delete"]('/:id', function (req, res) {
  _models.Project.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (response) {
    res.json(response);
  });
});
module.exports = router;