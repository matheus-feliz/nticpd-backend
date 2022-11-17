import express from 'express';
const route = express.Router();
import relatorio from '../controllers/relatorioController';

route.post('/relatorioBanco',  relatorio.relatorioBanco);
module.exports = route;