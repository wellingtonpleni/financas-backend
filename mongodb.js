require('dotenv').config();

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URL;

async function mongoConnection() {
    try {
        await mongoose.connect(uri);
        console.log('🍃 MongoDB conectado');
    } catch(error) {
        console.log(error);
    }
}

module.exports = mongoConnection;