const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const folderRoutes = require('./routes/folder');
const imageRoutes = require('./routes/image');

const PORT = 3000;
const URL = process.env.URL;

const app = express();

mongoose.connect(URL);

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/folder', folderRoutes);
app.use('/image', imageRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
