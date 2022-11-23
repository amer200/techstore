const express = require('express');
const route = express.Router();
const mainController = require('../controllers/main');

route.get('/', mainController.getMainPage);
route.get('/categ/:id', mainController.getCategPage);
route.get('/prod/:id', mainController.getProdPage);
route.get('/signup', mainController.getSignUp);
route.post('/signup', mainController.postSignUp);
module.exports = route;