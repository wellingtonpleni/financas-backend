const express = require('express');
const cors = require('cors');
const mongoConnection = require('./mongodb');

//IMPORTAÇÃO DAS ROTAS
const usuarioRoutes = require('./src/routes/usuario.routes');
const categoriaRoutes = require('./src/routes/categoria.routes');
const contaRoutes = require('./src/routes/conta.routes');
const cartaoRoutes = require('./src/routes/cartao.routes');
const receitaRoutes = require('./src/routes/receita.routes');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.disable('x-powered-by');

//ROTAS
app.use('/usuario', usuarioRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/conta', contaRoutes);
app.use('/cartao', cartaoRoutes);
app.use('/receita', receitaRoutes);

// ROTA PARA TRATAR EXCEÇÕES -404 (DEVE SER A ÚTIMA ROTA SEMPRE) 
app.use(function (req, res) {
  res.status(404).json({
    errors: [
      {
        value: `${req.originalUrl}`,
        msg: `A rota ${req.originalUrl} não existe nesta API 🚫`,
        param: 'routes'
      }
    ]
  })
})

mongoConnection();

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
})
