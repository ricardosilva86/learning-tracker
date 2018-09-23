const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/config');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test'){
    mongoose.connect(config.mongoConnectionString, { useNewUrlParser: true });
}

app.use(bodyParser.json({}));
routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = app;