const router = require('express').Router();
const actionModel = require('../data/helpers/actionModel');
const { validateProject, validateActionID, validateActionBody } = require('../middleware/middleware');

// GET'ting all the actions to display

router.get('/', (request, response) => {
    actionModel
    .get()
    .then(result => {
        response.status(200).json(result)
    })
    .catch(error => {
        response.status(500).json({
            errorMessage: `There was an error retrieving the information. ${error}`
        })
    })
})