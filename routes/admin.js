const express = require('express');

const route = express.Router();
const adminControllers = require('../controllers/admin');

route.get('/', adminControllers.getMainPage);
/* prods*/
route.post('/add-prod', adminControllers.addProd);
/* categ */
route.get('/categs', adminControllers.getCategsPage);
route.post('/add-categ', adminControllers.addCateg);
route.get('/prods/:categId', adminControllers.getCategProds)

module.exports = route;