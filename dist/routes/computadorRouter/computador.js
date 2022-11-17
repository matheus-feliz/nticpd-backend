"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
const route = _express2.default.Router();
var _computadorController = require('../../controllers/computador/computadorController'); var _computadorController2 = _interopRequireDefault(_computadorController);



//pagina de equipamento
route.post('/cadastrocomputador', _computadorController2.default.cadastro);
route.post('/register/edit/:id', _computadorController2.default.editEquipamentoPost);
route.delete('/cadastrocomputador/delete/:id', _computadorController2.default.delete);
route.get('/buscacomputador', _computadorController2.default.buscaRetorno);

module.exports = route;