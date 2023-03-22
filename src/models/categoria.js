const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['R', 'D']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}, {timestamps: true});

categoriaSchema.index({nome:1, usuario:1}, {unique: true});

module.exports = mongoose.model('Categoria', categoriaSchema);