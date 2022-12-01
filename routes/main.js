const express = require('express');
const route = express.Router();
const mainController = require('../controllers/main');
const cardController = require('../controllers/card');
const orderController = require('../controllers/order');
const authController = require('../controllers/auth');
route.get('/', authController.addUserLocal, mainController.getMainPage);
route.get('/categ/:id', authController.addUserLocal, mainController.getCategPage);
route.get('/prod/:id', authController.addUserLocal, mainController.getProdPage);
route.get('/signup', authController.addUserLocal, mainController.getSignUp);
route.post('/signup', authController.addUserLocal, mainController.postSignUp);
route.get('/login', authController.addUserLocal, mainController.getLogin);
route.post('/login', authController.addUserLocal, mainController.postLogin);
/** card */
route.get('/add-to-card/:id', authController.isUserAllow, authController.addUserLocal, cardController.addTocard, mainController.card);
route.get('/min-from-card/:id', authController.isUserAllow, authController.addUserLocal, cardController.minProdFromCard, mainController.card);
route.get('/plus-from-card/:id', authController.isUserAllow, authController.addUserLocal, cardController.plusProdFromCard, mainController.card);
route.get('/info', authController.addUserLocal, mainController.getInfo);
route.get('/cond', authController.addUserLocal, mainController.getCond);
route.get('/contact', authController.addUserLocal, mainController.getCntactUs);
route.post('/contact', mainController.postContactUS);
route.get('/card', authController.addUserLocal, mainController.getShopBag);
/* order */
route.get('/addOrder', authController.isUserAllow, authController.addUserLocal, orderController.submitOrder);
module.exports = route;