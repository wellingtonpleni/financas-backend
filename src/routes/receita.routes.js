const express = require('express');
const router = express.Router();
const Receita = require('../models/receita');
const Conta = require('../models/conta');

//ADICIONAR RECEITA
router.post('/', async (req, res) => {
    try {
        const receita = new Receita(req.body);
        await receita.save();

        const conta = await Conta.findByIdAndUpdate(
            { _id: req.body.conta },
            { $inc: { saldo: receita.valor } },
            { new: true }
        );

        res.status(201).send({ message: 'Receita adicionada com sucesso', receita: receita, saldo: conta.saldo });
    } catch (error) {
        res.status(500).send({ erro: true, message: error.message });
    }
});

//ATUALIZAR UMA RECEITA
router.put('/:id', async (req, res) => {
    try {
        const receita = await Receita.findById(req.params.id);
        const valorAntigo = receita.valor;

        const receitaAtualizada = await Receita.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        const conta = await Conta.findById(receita.conta);
        const novoSaldo = conta.saldo - valorAntigo + receitaAtualizada.valor;
        const contaAtualizada = await Conta.findByIdAndUpdate(
            receita.conta,
            { saldo: novoSaldo },
            { new: true }
        );

        res.status(200).send({
            message: 'Receita atualizada com sucesso',
            receita: receitaAtualizada,
            saldo: contaAtualizada.saldo
        });
    } catch (error) {
        res.status(500).send({ erro: true, message: error.message });
    }
})

//DELETAR RECEITA
router.delete('/:id', async (req, res) => {
    try {
        const receita = await Receita.findByIdAndDelete(req.params.id).lean();

        const conta = await Conta.findByIdAndUpdate(
            { _id: receita.conta },
            { $inc: { saldo: -receita.valor } },
            { new: true }
        );

        res.status(201).send({ message: 'Receita excluída com sucesso', receita: receita, saldo: conta.saldo });
    } catch (error) {
        res.status(500).send({ erro: true, message: error.message });
    }
});

module.exports = router;