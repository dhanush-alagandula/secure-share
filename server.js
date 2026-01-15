require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = require('./config/db');
connectDB();

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));
// Routes
app.use('/api/files', require('./routes/files'));

app.get('/', (req, res) => res.send('Server is running'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



