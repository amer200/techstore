const express = require('express');
const route = express.Router();
const mainController = require('../controllers/main');
const authController = require('../controllers/auth');
route.get('/', authController.addUserLocal, mainController.getMainPage);
route.get('/categ/:id', authController.addUserLocal, mainController.getCategPage);
route.get('/prod/:id', authController.addUserLocal, mainController.getProdPage);
route.get('/signup', authController.addUserLocal, mainController.getSignUp);
route.post('/signup', authController.addUserLocal, mainController.postSignUp);
route.get('/login', authController.addUserLocal, mainController.getLogin);
route.post('/login', authController.addUserLocal, mainController.postLogin);
route.get('/add-to-card/:id', authController.isUserAllow, authController.addUserLocal, mainController.addToCard);
route.get('/info', authController.addUserLocal, mainController.getInfo);
route.get('/cond', authController.addUserLocal, mainController.getCond);

module.exports = route;