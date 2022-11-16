"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
const route = _express2.default.Router();
var _unidadeController = require('../../controllers/unidade/unidadeController'); var _unidadeController2 = _interopRequireDefault(_unidadeController);

//pagina de Unidade, unidade pronto
route.post('/registrounidade',  _unidadeController2.default.cadastro);
route.post('/registrounidade/edit/:id',  _unidadeController2.default.edit);
route.delete('/cadastrounidade/delete/:id',  _unidadeController2.default.delete);
route.get('/buscaunidade',  _unidadeController2.default.buscaRetorno);

module.exports = route;