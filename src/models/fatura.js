const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faturaSchema = new Schema({
    cartao: {
        type: mongoose.Types.ObjectId,
        ref: 'Cartao',
        required: true
    },
    despesa: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Despesa',
            required: true
        }
    ],
    mes: {
        type: Number,
        required: true,
    },
    ano: {
        type: Number,
        required: true
    },
    valor: {
        type: Number,
    },
    fechada: {
        type: Boolean
    }
}, {timestamps: true});

faturaSchema.index({mes:1, ano:1, cartao:1}, {unique: true});

module.exports = mongoose.model('Fatura', faturaSchema);