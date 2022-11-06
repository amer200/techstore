require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const port = process.env.PORT;
const db = process.env.DB;

/********************************************************************* */
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
/********************************************************************* */
// const store = new MongoDBStore({
//     uri: db,
//     collection: 'mySessions'
// });
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: store
// }))
/********************************************************************* */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({
    storage: storage
})
app.post('/admin/add-categ', upload.single('img'));
app.post('/admin/add-prod', upload.array('img'));
app.post('/admin/edit-categ/:cId', upload.single('img'));
/********************************************************************* */
//routes
// const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// app.use('/', mainRoutes);
/********************************************************************* */

mongoose.connect(db)
    .then(resu => {
        console.log('db conected')
        app.listen(port, () => {
            console.log(`app on port : ${port}`)
        })
    })
    .catch(err => {
        console.log(err)
    })