const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

router.post('/', async(req, res) => {
    try{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    }catch(error) {
        res.status(400).send({erro: true, message: error.message});
    }
})

router.get('/:id', async(req, res) => {
    try{
        
    }catch(error) {
        res.status(400).send({erro: true, message: error.message});
    }
})

module.exports = router;