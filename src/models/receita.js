const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receitaSchema = new Schema({
    categoria: {
        type: mongoose.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    conta: {
        type: mongoose.Types.ObjectId,
        ref: 'Conta',
        required: true
    },
    usuario: {
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    valor: {
        type: Number,
        required: true,
        min: 0
    },
    descrição: {
        type: String
    },
    dataReceita: {
        type: Date,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Receita', receitaSchema);