const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria');

//ADICIONAR UMA CATEGORIA
router.post('/', async (req, res) => {
    try {
        const { nome, usuario } = req.body;
        const categoriaExistente = await Categoria.findOne({ nome, usuario });

        if (categoriaExistente) {
            return res.status(422).json({ erro: true, message: 'Já existe uma categoria com este nome.' });
        }

        const categoria = new Categoria(req.body);
        await categoria.save();

        res.status(200).json({ message: 'Categoria criada com sucesso.', categoria });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(422).json({ erro: true, message: error.message });
        }
        res.status(500).json({ erro: true, message: error.message });
    }
})

//OBTER TODAS AS CATEGORIAS DE DESPESA PARA UM USUÁRIO
router.get('/despesa', async (req, res) => {
    try {
        const usuario = req.body.usuario;
        const categorias = await Categoria.find({ usuario: usuario, tipo: 'D' })
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
})

//OBTER TODAS AS CATEGORIAS DE RECEITA PARA UM USUÁRIO
router.get('/receita', async (req, res) => {
    try {
        const usuario = req.body.usuario;
        const categorias = await Categoria.find({ usuario: usuario, tipo: 'R' })
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
})

//ATUALIZAR UMA CATEGORIA PELO ID
router.put('/:id', async (req, res) => {
    try {
        const { nome, tipo, usuario } = req.body;
        const categoria = await Categoria.findById(req.params.id)

        if (!categoria) {
            return res.status(404).json({ erro: true, message: 'Categoria não encontrada.' });
        }

        // Verifica se já existe uma categoria com o mesmo nome para o usuário
        const categoriaExistente = await Categoria.findOne({ _id: { $ne: categoria._id }, nome, usuario });

        if (categoriaExistente) {
            return res.status(422).json({ erro: true, message: 'Já existe uma categoria com este nome.' });
        }

        // Atualiza a categoria com as novas informações
        categoria.nome = nome;
        categoria.tipo = tipo;

        const categoriaAtualizada = await categoria.save();

        res.status(200).json({ message: 'Categoria atualizada com sucesso.', categoria: categoriaAtualizada });
    } catch (error) {
        res.status(500).send({ erro: true, message: error.message });
    }
})

//DELETAR UMA CATEGORIA
router.delete('/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndDelete(req.param.id).lean();

        if (categoria) {
            return res.status(200).send({
                message: "Categoria deletada com sucesso.",
                categoria: categoria
            })
        }

        res.status(404).send({message: "Categoria não encontrada."});
    } catch (error) {
        res.status(500).send({ erro: true, message: error.message });
    }
})

module.exports = router;