const express = require('express');
const router = express.Router();
const Cartao = require('../models/cartao');

//ADICIONAR UM CARTÃO
router.post('/', async (req, res) => {
    try {
        const { apelido, usuario } = req.body;
        const cartaoExistente = await Cartao.findOne({ apelido, usuario });

        if (cartaoExistente) {
            return res.status(422).send({ erro: true, message: "Já existe um cartão com esse apelido" });
        }

        const cartao = new Cartao(req.body);
        await cartao.save();

        res.status(201).send({ message: "Cartão salvo com sucesso.", cartao: cartao });
    } catch (error) {
        res.status(500).send({ erro: true, message: error.message });
    }
});

//OBTER UM CARTAO
router.get('/:id', async (req, res) => {
    try {
        const cartao = await Cartao.findById(req.params.id);

        if (cartao) {
            return res.status(200).send(cartao);
        }

        res.status(404).send({ message: "Nenhum cartão encontrado" });
    } catch (error) {
        res.status(500).send({ erro: true, message: error.message });
    }
})

//OBTER TODOS OS CARTOES
router.get('/all/:id', async (req, res) => {
    try {
        const cartao = await Cartao.find({ usuario: req.params.id });
        res.status(200).send(cartao);
    } catch (error) {
        res.status(500).send({ erro: true, message: error.message });
    }
})

//ATUALIZAR UM CARTAO
router.put('/:id', async (req, res) => {
    try {
        const cartao = await Cartao.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).send({ message: "Cartão atualizado com sucesso.", cartao: cartao });
    } catch (error) {
        res.status(500).send({ erro: true, message: error.message });
    }
})

//DELETAR UM CARTÃO
router.delete('/:id', async (req, res) => {
    try {
        const cartao = await Cartao.findByIdAndDelete(req.params.id).lean();

        if (cartao) {
            return res.status(200).send({ message: "Cartão deletado com sucesso.", cartao: cartao });
        }

        res.status(404).send({ message: "Cartão não encontrado." });
    } catch (error) {
        res.status(500).send({ erro: true, message: error.message });
    }
})

module.exports = router;