const actionModel = require("../data/helpers/actionModel");
const projectModel = require("../data/helpers/projectModel");

// logger

function logger(request, response, next) {
    console.log(
      `${request.method} ${request.originalUrl} at ${new Date().toISOString()}`
    );
    next();
  }

  // action ID validation

function validateActionID(request, response, next) {
    const ID = request.params.id;
    actionModel
      .get(ID)
      .then(response => {
        if (response) {
          next();
        } else {
          response.status(400).json({
            errorMessage: `${ID} does not exist in the database.`
          });
        }
      })
      .catch(error => {
        response.status(500).json({
          errorMessage: `The action information could not be retrieved. ${error}`
        });
      });
  };

  // project ID validation

function validateProjectID(request, response, next) {
    projectModel
      .get(request.params.id)
      .then(response => {
        if (response) {
          next()
        } else {
          response.status(404).json({
            errorMessage: `Project ID is invalid.`
          });
        }
      })
      .catch(error => {
        response.status(500).json({
          errorMessage: `The project information could not be retrieved. ${error}`
        });
      });
  };