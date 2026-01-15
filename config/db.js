const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB database connection established successfully');

        mongoose.connection.once('open', () => {
            console.log('MongoDB event: connection open');
        });

    } catch (err) {
        console.error('Error connecting to database: ', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
