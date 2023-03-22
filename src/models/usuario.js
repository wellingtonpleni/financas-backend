const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        reuired: true,
        unique: true,
        validate: {
            validator: function(v){
                return mongoose.model('Usuario', usuarioSchema)
                    .findOne({ email: v })
                    .then(user => !user)
                    .catch(() => false)
            },
            message: props => `${props.value} já está em uso.`
        }
    },
    senha: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Usuario', usuarioSchema);
