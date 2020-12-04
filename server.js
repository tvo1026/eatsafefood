const express = require('express');
const path = require('path'); 
const logger = require('./middleware/logger')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

// Middlewares
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Routes
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

// Init middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Conect to DB
const usersDb = require('./models/User');
app.use('/User', usersDb);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));