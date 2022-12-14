const express =require('express');
const route = express.Router();
const unidade =  require('../../controllers/unidade/unidadeController');

//pagina de Unidade, unidade pronto
route.post('/registrounidade',  unidade.cadastro);
route.post('/registrounidade/edit/:id',  unidade.edit);
route.delete('/cadastrounidade/delete/:id',  unidade.delete);
route.get('/buscaunidade',  unidade.buscaRetorno);

module.exports = route;