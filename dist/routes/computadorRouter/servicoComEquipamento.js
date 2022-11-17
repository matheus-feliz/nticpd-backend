"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
const route = _express2.default.Router();
var _servicoComEquipamento = require('../../controllers/computador/servicoComEquipamento'); var _servicoComEquipamento2 = _interopRequireDefault(_servicoComEquipamento);

//pagina de servico com equipamento
route.get('/listagemcomputador/:id',  _servicoComEquipamento2.default.listagem);
route.post('/registro/servico',  _servicoComEquipamento2.default.cadastroDeServicoPost);
route.post('/registro/edit/servico/:id',  _servicoComEquipamento2.default.editServicoCadastro);
route.delete('/listagemcomputador/delete/:id',  _servicoComEquipamento2.default.deleteServicoUm);

//impressao
route.get('/impressao/:id',  _servicoComEquipamento2.default.impressao);

module.exports = route;