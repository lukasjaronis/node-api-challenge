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

// GET'ting actions to display by ID

router.get('/:id', validateActionID, (request, response) => {
    actionModel
    .get(request.params.id)
    .then(result => {
        response.status(200).json(result)
    })
    .catch(error => {
        response.status(500).json({
            errorMessage: `There was an error retrieving the information. ${error}`
        })
    })
})

// POST

router.post('/', validateActionBody, validateProject, (request, response) => {
    actionModel
    .insert(request.body)
    .then(result => {
        response.status(201).json(result)
    })
    .catch(error => {
        response.status(500).json({
            errorMessage: `There was an error posting your request. ${error}`
        })
    })
})

// PUT 

router.put('/:id', validateActionID, validateProject, (request, response) => {
    actionModel
    .update(request.params.id, request.body)
    .then(result => {
        response.status(200).json(result)
    })
    .catch(error => {
        response.status(500).json({
            errorMessage: `There was an error updating and saving you request. ${error}`
        })
    })
})

// DELETE 

router.delete('/:id', validateActionID, (request, response) => {
    actionModel.remove(request.params.id)
    .then(result => {
        response.status(200).json({
            successMessage: `ID ${result} has been deleted.`
        })
    })
    .catch(error => {
        response.status(500).json({
            errorMessage: `There was an error removing your request from the database. ${error}`
        })
    })
})


module.exports = router;