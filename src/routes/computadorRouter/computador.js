import express from 'express';
const route = express.Router();
import computador from '../../controllers/computador/computadorController';



//pagina de equipamento
route.post('/cadastrocomputador', computador.cadastro);
route.post('/register/edit/:id', computador.editEquipamentoPost);
route.delete('/cadastrocomputador/delete/:id', computador.delete);
route.get('/buscacomputador', computador.buscaRetorno);

module.exports = route;