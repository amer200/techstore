const express = require('express');
const route = express.Router();
const mainController = require('../controllers/main');

route.get('/', mainController.getMainPage);
route.get('/categ/:id', mainController.getCategPage);
module.exports = route;