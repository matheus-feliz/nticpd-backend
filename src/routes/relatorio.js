const express = require('express');
const route = express.Router();
const relatorio = require('../controllers/relatorioController');

route.post('/relatorioBanco',  relatorio.relatorioBanco);
module.exports = route;