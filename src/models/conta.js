const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contaSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['C', 'P']
    },
    saldo: {
        type: Number,
        default: 0
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
},{timestamps: true});

contaSchema.index({nome:1, usuario:1}, {unique: true});

module.exports = mongoose.model('Conta', contaSchema);