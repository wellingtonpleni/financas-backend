const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

//ADICIONAR USUÁRIO
router.post('/', async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    } catch (error) {
        res.status(400).send({ erro: true, message: error.message });
    }
})

//OBTER TODOS USUÁRIOS
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, '-senha');
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(400).send({ erro: true, message: error.message });
    }
})

//ATUALIZAR UM USUÁRIO
router.put('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, select: '-senha' }
        );
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ erro: true, message: error.message })
    }
})

//DELETAR UM USUÁRIO
router.delete('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id).lean();
        delete usuario.senha;
        delete usuario.__v;

        res.status(200).json({
            message: "Usuário deletado com sucesso!",
            usuario: usuario
        });
    } catch (error) {
        res.status(400).json({ erro: true, message: error.message });
    }
})

module.exports = router;