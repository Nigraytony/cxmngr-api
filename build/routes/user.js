"use strict";

var _express = _interopRequireDefault(require("express"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _passport = _interopRequireDefault(require("passport"));

var _models = require("../db/models");

var _config = _interopRequireDefault(require("../config"));

var _helpers = _interopRequireDefault(require("../helpers/helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = _express["default"].Router();

router.post('/signup', function (req, res) {
  // console.log(req);
  _models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function (user) {
    if (user) {
      res.status(400).send("User with this email is already exists");
    } else {
      _bcrypt["default"].hash(req.body.password, _config["default"].bcrypt.saltRounds, function (err, hash) {
        _models.User.create({
          fullName: req.body.fullName,
          email: req.body.email,
          password: hash
        }).then(function (user) {
          res.json(user);
        });
      });
    }
  })["catch"](function (err) {
    res.status(err.statusCode).send(err.message);
  });
});
router.post('/signin/local', function (req, res) {
  _models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function (user) {
    _bcrypt["default"].compare(req.body.password, user.password).then(function (equal) {
      if (equal) {
        var body = {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          thumbnail: user.thumbnail,
          title: user.title,
          company: user.company,
          phone: user.phone,
          website: user.website,
          address: user.address,
          notes: user.notes,
          defaultProject: user.defaultProject
        };

        var token = _helpers["default"].jwtSign({
          user: body
        });

        res.json({
          user: user,
          success: true,
          token: token
        });
      } else {
        res.status(400).send("Wrong password");
      }
    });
  })["catch"](function () {
    res.status(400).send("User with this email does not exist");
  });
});
router.get('/signin/google', function (req, res, next) {
  _passport["default"].authenticate("google", {
    scope: ["profile", "email"],
    state: req.query.app
  })(req, res, next);
});
router.get('/signin/google/callback', _passport["default"].authenticate("google", {
  failureRedirect: "/login",
  session: false
}), function (req, res) {
  socialRedirect(res, req.query.state, req.user.token, _config["default"]);
});
router.get('/signin/microsoft', function (req, res, next) {
  _passport["default"].authenticate("microsoft", {
    scope: ["https://graph.microsoft.com/user.read openid"],
    state: req.query.app
  })(req, res, next);
});
router.get('/signin/microsoft/callback', _passport["default"].authenticate("microsoft", {
  failureRedirect: "/login",
  session: false
}), function (req, res) {
  socialRedirect(res, req.query.state, req.user.token, _config["default"]);
});
router.get('/avatar/:id', function (req, res) {
  _models.User.findByPk(req.params.id).then(function (user) {
    res.json(user.thumbnail);
  });
});
router.put('/:id', function (req, res) {
  // console.log(req);
  _models.User.update(req.body, {
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
router.put('/resetpassword/:id', function (req, res) {
  // console.log(req);
  // User.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
  //     res.json(model.dataValues);
  // })
  _bcrypt["default"].hash(req.body.password, _config["default"].bcrypt.saltRounds, function (err, hash) {
    _models.User.update({
      password: hash
    }, {
      where: {
        id: req.body.userId
      }
    }).then(function (user) {
      res.json(user);
    });
  });
});

function socialRedirect(res, state, token, config) {
  var url;
  var fullPath = /^http(s?):\/\//.test(state);

  if (fullPath) {
    url = state;
  } else {
    url = config.hostUI + "".concat(config.portUI ? ":".concat(config.portUI) : "") + "".concat(state ? "/".concat(state) : "");
  }

  res.redirect(url + "/#/login?token=" + token);
}

module.exports = router;