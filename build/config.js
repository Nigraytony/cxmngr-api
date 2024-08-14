"use strict";

var config = {
  bcrypt: {
    saltRounds: 10
  },
  admin_pass: "password",
  admin_email: "admin@cxmngr.com",
  secret_key: "HUEyqESqgQ1yTwzVlO6wprC9Kf1J1xuA",
  remote: 'http://localhost',
  port: process.env.NODE_ENV === "production" ? "" : "8080",
  hostUI: process.env.NODE_ENV === "production" ? "http://localhost" : "http://localhost",
  portUI: process.env.NODE_ENV === "production" ? "" : "3000",
  google: {
    clientId: "592707349093-3ab6a0seutt1qpiiq8u0k3in5k7f226d.apps.googleusercontent.com",
    clientSecret: "bLOpF3YRLnYbdVKJGTRoYkXr"
  },
  microsoft: {
    clientId: "6ee67a68-19e2-4efc-8485-ba5783f1672c",
    clientSecret: "K1?+9TM5?9-UN+pbMIx-PZQn3dKQysIM"
  }
};
config.host = process.env.NODE_ENV === "production" ? config.remote : "http://localhost";
config.apiUrl = "".concat(config.host).concat(config.port ? ":".concat(config.port) : "");
module.exports = config;