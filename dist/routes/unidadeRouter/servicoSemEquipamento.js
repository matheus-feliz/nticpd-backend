"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
const route = _express2.default.Router();
var _servicoSemEquipamento = require('../../controllers/unidade/servicoSemEquipamento'); var _servicoSemEquipamento2 = _interopRequireDefault(_servicoSemEquipamento);

route.get('/impressaounidade/:id',  _servicoSemEquipamento2.default.impressao);

//pagina de servico sem equipamento
route.get('/listagemunidade/:id',  _servicoSemEquipamento2.default.listagem);
route.post('/registro/servicoUnidade',  _servicoSemEquipamento2.default.cadastroDeServicoPost);
route.post('/registro/edit/servicoUnidade/:id',  _servicoSemEquipamento2.default.editServicoCadastro);
route.delete('/listagemunidade/delete/:id',  _servicoSemEquipamento2.default.deleteServicoUm);

module.exports = route;