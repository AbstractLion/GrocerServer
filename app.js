require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://grocer:${process.env.DB_PASSWORD}@grocer-7esjj.mongodb.net/test`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const postItems = require('./controllers/items/post');
app.post('/items', postItems);

const getItems = require('./controllers/items/get');
app.get('/items', getItems);

const activateList = require('./controllers/lists/activate');
app.post('/lists/:qrCode/activate', activateList);

const getLists = require('./controllers/lists/get');
app.get('/lists', getLists);

const getStores = require('./controllers/stores/get');
app.get('/stores/')

app.get('/', (req, res) => res.json({dragon: 'fruit'}));

app.listen(port, () => console.log('Listening on port '+ port));

module.exports = app;
