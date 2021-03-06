require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://grocer:${process.env.DB_PASSWORD}@grocer-7esjj.mongodb.net/test`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.set('useFindAndModify', false);

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const postItems = require('./controllers/items/post');
app.post('/items', postItems);

const getItems = require('./controllers/items/get');
app.get('/items', getItems);

const activateList = require('./controllers/lists/activate');
app.post('/lists/activate', activateList);

const completeList = require('./controllers/lists/complete');
app.post('/lists/complete', completeList);

const cancelList = require('./controllers/lists/cancel');
app.post('/lists/cancel', cancelList);

const getLists = require('./controllers/lists/get');
app.get('/lists', getLists);

const postLists = require('./controllers/lists/post');
app.post('/lists', postLists);

const getStores = require('./controllers/stores/get');
app.get('/stores', getStores);

const postStores = require('./controllers/stores/post');
app.post('/stores', postStores);

const radarioEnteredGeofence = require('./controllers/radario/enteredGeofence');
app.post('/radario/enteredGeofence', radarioEnteredGeofence);

const radarioExitedGeofence = require('./controllers/radario/exitedGeofence');
app.post('/radario/exitedGeofence', radarioExitedGeofence);

const postUser = require('./controllers/users/post');
app.post('/users', postUser);

const getAllUsers = require('./controllers/users/getAll');
app.get('/users', getAllUsers);

const getUser = require('./controllers/users/get');
app.get('/users/:id', getUser);

app.get('/', (req, res) => res.json({dragon: 'fruit'}));

app.listen(port, () => console.log('Listening on port '+ port));

module.exports = app;
