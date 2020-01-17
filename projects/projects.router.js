const router = require('express').Router();
const projectModel = require('../data/helpers/projectModel');
const { validateProjectID, validateProjectBody } = require('../middleware/middleware');

// GET'ting all projects to display

router.get('/', (request, response) => {
    projectModel
    .get()
    .then(result => {
        response.status(200).json(result)
    })
    .catch(error => {
        response.status(500).json({
            errorMessage: `There was an error retrieving projects. ${error}`
        })
    })
})

// GET'ting projects by ID

router.get('/:id', validateProjectID, (request, response) => {
    projectModel
    .get(request.params.id)
    .then(result => {
        response.status(200).json(result)
    })
    .catch(error => {
        response.status(500).json({
            errorMessage: `There was an error retrieving project information. ${error}`
        })
    })
})

// GET'ting projects actions

router.get('/:id/actions', validateProjectID, (request, response) => {
    projectModel.getProjectActions(request.params.id)
    .then(result => {
        response.status(200).json(result)
    })
    .catch(error => {
        response.status(500).json({
            errorMessage: `There was an error retrieving project information. ${error}`
        })
    })
})

// POST

router.post('/', validateProjectBody, (request, response) => {
    projectModel
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

router.put('/:id', validateProjectID, (request, response) => {
    projectModel
    .update(request.params.id, request.body) 
    .then(result => {
        response.status(200).json(result)
    })
    .catch(error => {
        response.status(500).json({
            errorMessage: `There was an error updating your request. ${error}` 
        })
    })
})

// DELETE

router.delete('/:id', validateProjectID, (request, response) => {
    projectModel
    .remove(request.params.id)
    .then(result => {
        response.status(200).json({
            successMessage: `${result} has been deleted.`
        })
    })
    .catch(error => {
        response.status(500).json({
            errorMessage: `There was an error removing your request. ${error}`
        })
    })
})


module.exports = router;