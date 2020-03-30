const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://leonzalion:${process.env.DB_PASSWORD}@grocer-7esjj.mongodb.net/test`, {useNewUrlParser: true});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const postItems = require('./controllers/items/post');
app.post('/items', postItems);

const getItems = require('./controllers/items/get');
app.get('/items', getItems);

module.exports = app;
