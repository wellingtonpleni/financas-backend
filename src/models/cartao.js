const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartaoSchema = new Schema({
    conta: {
        type: Schema.Types.ObjectId,
        ref: 'Conta',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        rquired: true
    },
    apelido: {
        type: String,
        required: true
    },
    bandeira: {
        type: String,
        required: true
    },
    limite: {
        type: Number,
        required: true,
        min: 0
    },
    fechamento: {
        type: Number,
        required: true,
        min: 1,
        max: 31
    },
    vencimento: {
        type: Number,
        required: true,
        min: 1,
        max: 31
    }
}, {timestamps: true});

cartaoSchema.index({apelido: 1, usuario: 1}, {unique: true});

module.exports = mongoose.model('Cartao', cartaoSchema);