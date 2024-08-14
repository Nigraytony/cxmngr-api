import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { User } from "../db/models";
import config from "../config";
import helpers from "../helpers/helpers";

const router = express.Router();

router.post('/signup', (req, res) => {
  // console.log(req);
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user) {
            res.status(400).send("User with this email is already exists");
        } else {
            bcrypt.hash(req.body.password, config.bcrypt.saltRounds, (err, hash) => {
                User.create({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hash
                })
                .then((user) => {
                    res.json(user);
                });
            });
        }
    }).catch((err) => {
        res.status(err.statusCode).send(err.message);
    })
});

router.post('/signin/local', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    }
  }).then(user => {
    bcrypt.compare(req.body.password, user.password).then((equal) => {
      if (equal) {
        const body = {
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
          defaultProject: user.defaultProject,
        };
        const token = helpers.jwtSign({user: body});
        res.json({
          user,
          success: true,
          token
        })
      } else {
        res.status(400).send("Wrong password");
      }
    });
  }).catch(() => {
    res.status(400).send("User with this email does not exist");
  })

});


router.get('/signin/google', (req, res, next) => {
    passport.authenticate("google", {scope: ["profile", "email"], state: req.query.app})(req, res, next);
});

router.get('/signin/google/callback', passport.authenticate("google", {failureRedirect: "/login", session: false}),
  function (req, res) {
    socialRedirect(res, req.query.state, req.user.token, config);
  }
);

router.get('/signin/microsoft', (req, res, next) => {
    passport.authenticate("microsoft", {scope: ["https://graph.microsoft.com/user.read openid"], state: req.query.app})(req, res, next);
});

router.get('/signin/microsoft/callback', passport.authenticate("microsoft", {failureRedirect: "/login", session: false}),
  function (req, res) {
    socialRedirect(res, req.query.state, req.user.token, config);
  }
);

router.get('/avatar/:id', (req, res) => {
  User.findByPk(req.params.id).then(user => {
      res.json(user.thumbnail);
  })
});

router.put('/:id', (req, res) => {
  // console.log(req);
  User.update(req.body, {where: {id: req.body.id}, returning: true, plain: true}).then(([, model]) => {
      res.json(model.dataValues);
  })
});

router.put('/resetpassword/:id', (req, res) => {
  // console.log(req);
  // User.update(req.body, {where: {id: req.params.id}, returning: true, plain: true}).then(([, model]) => {
  //     res.json(model.dataValues);
  // })
  bcrypt.hash(req.body.password, config.bcrypt.saltRounds, (err, hash) => {
    User.update({ password: hash },{ where:{ id:req.body.userId } })
    .then((user) => {
        res.json(user);
    });
});
});

// router.get('/dataexport', (req, res) => {
//   User.findAll().then(users => {
//       res.json(users);
//   })
// });

function socialRedirect(res, state, token, config) {
  let url;
  let fullPath = /^http(s?):\/\//.test(state);
  if (fullPath) {
    url = state;
  } else {
    url = config.hostUI + `${config.portUI ? `:${config.portUI}` : ``}` + `${state ? `/${state}` : ``}`;
  }
  res.redirect(url + "/#/login?token=" + token);
}

module.exports = router;
