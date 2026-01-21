require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
connectDB();

//use cors
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS ? process.env.ALLOWED_CLIENTS.split(',') : '*'
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//Template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.get('/', (req, res) => res.render('index'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



