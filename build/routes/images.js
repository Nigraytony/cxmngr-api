"use strict";

var _express = _interopRequireDefault(require("express"));

var _models = require("../db/models");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var path = require('path');

var router = _express["default"].Router(); // const fileFilter = function(req, file, cb) {
//     const allowedTypes = [ "image/jpeg", "image/png", "image/gif" ];
//     if(!allowedTypes.includes(file.mimetype)) {
//         const error = new Error("Wrong file type");
//         error.code = "LIMIT_FILE_TYPES";
//         return cb(error, false);
//     }
//     cb(null, true);
// }
// const upload = multer({
//     dest: './uploads/',
//     fileFilter
// });


var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, new Date().valueOf() + '_' + file.originalname);
  }
});

var upload = (0, _multer["default"])({
  storage: storage,
  limits: {
    fileSize: 500000
  }
});
router.get('/issue/:id', function (req, res) {
  _models.Image.findAll({
    where: {
      issueId: req.params.id
    }
  }).then(function (images) {
    res.json(images);
  });
});
router.get('/event/:id', function (req, res) {
  _models.Image.findAll({
    where: {
      eventId: req.params.id
    }
  }).then(function (images) {
    res.json(images);
  });
});
router.get('/:filename', function (req, res) {
  // res.json('filename');
  var filename = req.params.filename;
  var dirname = path.resolve();
  var fullfilepath = path.join(dirname, 'uploads/' + filename);
  return res.sendFile(fullfilepath);
});
router.put('/:id', function (req, res) {
  _models.Image.update(req.body, {
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
router.post('/profile', upload.single('file'), function (req, res) {
  _models.User.update({
    thumbnail: req.file.filename
  }, {
    where: {
      id: req.body.userId
    }
  }).then(function () {
    res.json({
      message: "User profile has been updated"
    });
  });
});
router.post('/single', upload.single('file'), function (req, res) {
  if (req.body.projectId) {
    _models.Project.update({
      img: req.file.filename
    }, {
      where: {
        id: req.body.projectId
      }
    });
  }

  _models.Image.create({
    projectId: req.body.projectId ? req.body.projectId : null,
    userId: req.body.userId ? req.body.userId : null,
    assetId: req.body.assetId ? req.body.assetId : null,
    issueId: req.body.issueId ? req.body.issueId : null,
    fptId: req.body.fptId ? req.body.fptId : null,
    submittalId: req.body.submittalId ? req.body.submittalId : null,
    eventId: req.body.eventId ? req.body.eventId : null,
    checklistId: req.body.checklistId ? req.body.checklistId : null,
    title: req.body.title,
    path: req.file.filename,
    status: true
  }); // console.log(req);


  res.send("Image Uploaded");
});
router["delete"]('/:id', function (req, res) {
  _models.Image.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (response) {
    res.json(response);
  });
});
module.exports = router;