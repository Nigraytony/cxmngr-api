"use strict";

var _express = _interopRequireDefault(require("express"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("../config"));

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
  _models.Projectusers.findAll().then(function (projectusers) {
    res.json(projectusers);
  });
});
router.get('/project/:id', function (req, res) {
  _models.Projectusers.findAll({
    where: {
      projectId: req.params.id
    },
    include: [{
      model: _models.User,
      attributes: ['fullName', 'company'],
      as: 'user'
    }]
  }).then(function (projectusers) {
    res.json(projectusers);
  });
});
router.get('/user/:id', function (req, res) {
  _models.Projectusers.findAll({
    where: {
      userId: req.params.id
    },
    include: [{
      model: _models.Project,
      attributes: ['id', 'title'],
      as: 'project'
    }]
  }).then(function (projectusers) {
    res.json(projectusers);
  });
});
router.put('/:id', function (req, res) {
  _models.Projectusers.update(req.body, {
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
  // console.log(req.body);
  _models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function (usr) {
    if (usr) {
      _models.Projectusers.findOne({
        where: {
          userId: usr.id,
          projectId: req.body.projectId
        }
      }).then(function (projusr) {
        if (projusr) {
          res.json({
            message: "User is already on the team"
          });
        } else {
          _models.Projectusers.create({
            userId: usr.id,
            projectId: req.body.projectId,
            role: req.body.role,
            status: req.body.status
          }).then(function (projectuser) {
            _models.Privileges.create({
              projectId: projectuser.projectId,
              userId: projectuser.userId,
              viewProject: true,
              createProject: false,
              editProject: false,
              deleteProject: false,
              viewIssue: true,
              createIssue: false,
              editIssue: false,
              deleteIssue: false,
              viewAsset: true,
              createAsset: false,
              editAsset: false,
              deleteAsset: false,
              viewChecklist: true,
              createChecklist: false,
              editChecklist: false,
              deleteChecklist: false,
              viewFpt: true,
              createFpt: false,
              editFpt: false,
              deleteFpt: false
            });

            res.json({
              message: "User has been added to the project"
            });
          });
        }
      });
    } else {
      res.json({
        message: "User does not exist in the database. Has the person created a profile?"
      });
    }
  });
});
router["delete"]('/:id', function (req, res) {
  console.log(req); // Projectusers.destroy({
  //     where: {
  //         userId: req.params.id,
  //         projectId: req.body.projectId
  //     }
  // }).then(response => {
  //     res.json(response);
  // })
});
module.exports = router;