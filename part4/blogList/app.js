const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controller/blogs');
const config = require('./utils/config');

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

module.exports = app;
