"use strict";

module.exports = {
  development: {
    "storage": "/Users/ngray/Documents/Code/backend/src/db/cxmngr.db",
    // "host": "http://localhost",
    "dialect": "sqlite" //  "database": "cxmngr_dev",
    //  "username": "postgres",
    //  "password": "CxM@n@ger020222"

  },
  production: {
    "storage": "/Users/ngray/Documents/Code/backend/src/db/cxmngr.db",
    // "host": "http://localhost",
    "dialect": "sqlite" // "dialect": "postgres",
    // "database": "cxmanager_production",
    // "username": "postgres",
    // "password": "CxM@n@ger020222"

  }
};