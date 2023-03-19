const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        reuired: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Usuario', usuarioSchema);
