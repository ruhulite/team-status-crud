const mongoose = require('mongoose');

const connectDb = async () => {
    console.log('MongoDB Connected');

    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to db>>>>> ${connect.connection.host} ${connect.connection.name}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDb;