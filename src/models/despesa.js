const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const despesaSchema = new Schema({
    categoria: {
        type: mongoose.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    cartaoConta: {
        type: mongoose.Types.ObjectId,
        ref: ['Cartao', 'Conta'],
        required: true
    },
    usuario: {
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    valor:{
        type: Number,
        required: true,
        min: 0
    },
    descricao: {
        type: String
    },
    formaPagamento: {
        type: String,
        required: true,
        enum: ['D', 'C', 'F']
    },
    condicao: {
        type: String,
        enum: ['A', 'P']
    },
    parcelas: {
        type: Number,
        min: 1
    },
    dataPagamento: {
        type: Date,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Despesa', despesaSchema);