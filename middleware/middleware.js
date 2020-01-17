const actionModel = require("../data/helpers/actionModel");
const projectModel = require("../data/helpers/projectModel");

// logger

function logger(request, response, next) {
    console.log(
      `${request.method} ${request.originalUrl} at ${new Date().toISOString()}`
    );
    next();
  }