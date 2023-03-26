const express = require('express');
const router = express.Router();
const Conta = require('../models/conta');

//CRIAR UMA CONTA
router.post('/', async(req, res) => {
    try {
        const { nome, usuario } = req.body;
        const contaExistente = await Conta.findOne({ nome, usuario });

        if (contaExistente) {
            return res.status(422).json({ erro: true, message: 'Já existe uma conta com este nome.' });
        }

        const conta = new Conta(req.body);
        await conta.save();

        res.status(201).send({message: "Conta criada com sucesso.", conta: conta});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(422).json({ erro: true, message: error.message });
        }
        res.status(500).json({ erro: true, message: error.message });
    }
})

//DELETAR UMA CONTA
router.delete('/:id', async(req, res) => {
    try {
        const conta = await Conta.findByIdAndDelete(req.params.id).lean();

        if(conta) {
            return res.status(200).send({
                message: "Conta excluída com sucesso.",
                conta: conta
            })
        }

        res.status(404).send({message: "Conta não encontrada."})

    } catch (error) {
        res.status(500).send({error: true, message: error.message});
    }
})

module.exports = router;