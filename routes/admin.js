const express = require('express');

const route = express.Router();
const adminControllers = require('../controllers/admin');

route.get('/', adminControllers.getMainPage);
/* prods*/
route.post('/add-prod', adminControllers.addProd);
route.post('/edit-prod/:pId', adminControllers.editProd);
route.get('/remove-prod-img/:pId/', adminControllers.removeProdImg);
route.get('/remove-prod/:id', adminControllers.removeProd);
/* categ */
route.get('/categs', adminControllers.getCategsPage);
route.post('/add-categ', adminControllers.addCateg);
route.get('/prods/:categId', adminControllers.getCategProds)
route.post('/edit-categ/:cId', adminControllers.editCateg)
route.get('/remove-categ/:cId', adminControllers.removeCateg)
/* orders*/
route.get('/orders', adminControllers.getOrders)
module.exports = route;