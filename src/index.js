import "@babel/polyfill";
require('dotenv').config()
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
// import cron from "node-cron";

const {exec} = require('child_process');

import products from "./routes/products";
import analytics from "./routes/analytics";
import user from "./routes/user";
import privileges from "./routes/privileges";
import projects from "./routes/projects";
import projectusers from "./routes/projectusers";
import contacts from "./routes/contacts";
import comments from "./routes/comments";
import tasks from "./routes/tasks";
import issues from "./routes/issues";
import assets from "./routes/assets";
import checklists from "./routes/checklists";
import checklistquestions from "./routes/checklistquestions";
import fpts from "./routes/fpts";
import events from "./routes/events";
import submittals from "./routes/submittals";
import images from "./routes/images";
import oprs from "./routes/oprs";
import oprballots from "./routes/oprballots";
import oprquestions from "./routes/oprquestions";
import oprresponses from "./routes/oprresponses";

const path = require('path');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 8080;

import "./auth/auth";

import db from "./db/models";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const subscriptionItems = new Map([
  [1, { priceInCents: 4900, name: "Basic"} ],
  [2, { priceInCents: 7900, name: "Standard"} ],
  [3, { priceInCents: 9900, name: "Pro"}],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => {
        const storeItem = subscriptionItems.get(item.id)
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: item.quantity
        }
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.use(function(err, req, res, next){
  if(err.code === "LIMIT_FILE_TYPES"){
    res.status(422).json({ error: "only images are allowed"});
    return;
  }
});
// app.use('/products', passport.authenticate("jwt", {session: false}), products);
// app.use('/privileges', passport.authenticate("jwt", {session: false}), privileges);
// app.use('/projects', passport.authenticate("jwt", {session: false}), projects);
// app.use('/projectusers', passport.authenticate("jwt", {session: false}), projectusers);
// app.use('/analytics', passport.authenticate("jwt", {session: false}), analytics);
// app.use('/contacts', passport.authenticate("jwt", {session: false}), contacts);
// app.use('/tasks', passport.authenticate("jwt", {session: false}), tasks);
// app.use('/issues', passport.authenticate("jwt", {session: false}), issues);
// app.use('/oprs', passport.authenticate("jwt", {session: false}), oprs);
// app.use('/oprballots', passport.authenticate("jwt", {session: false}), oprballots);
// app.use('/oprquestions', passport.authenticate("jwt", {session: false}), oprquestions);
// app.use('/oprresponses', passport.authenticate("jwt", {session: false}), oprresponses);
app.use('/products', products);
app.use('/user', user);
app.use('/privileges', privileges);
app.use('/projects', projects);
app.use('/projectusers', projectusers);
app.use('/analytics', analytics);
app.use('/contacts', contacts);
app.use('/comments', comments);
app.use('/tasks', tasks);
app.use('/issues', issues);
app.use('/assets', assets);
app.use('/checklists', checklists);
app.use('/checklistquestions', checklistquestions);
app.use('/fpts', fpts);
app.use('/events', events);
app.use('/submittals', submittals);
app.use('/oprs', oprs);
app.use('/oprballots', oprballots);
app.use('/oprquestions', oprquestions);
app.use('/oprresponses', oprresponses);
app.use('/images', images);

db.sequelize.sync().then(() => {
  app.listen(port, function () {
      console.log(`App listening on port ${port}!!`);
  });
  // cron.schedule('* */2 * * *', () => {
  //   exec('yarn products:update', (err) => {
  //     if (err) {
  //       console.error(err);
  //     }
  //   });
  // });
});