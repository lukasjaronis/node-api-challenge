const express = require("express");
const server = express();
const { logger } = require('../middleware/middleware');
const helmet = require('helmet');
const projectsRouter = require("../projects/projects.router");
const actionsRouter = require('../actions/actions-router');



server.use(express.json());
server.use(logger);
server.use(helmet());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);


server.get('/', (request, response) => {
    response.send("API ONLINE")
})

module.exports = server;