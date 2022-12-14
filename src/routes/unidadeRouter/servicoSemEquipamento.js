const express = require('express');
const route = express.Router();
const servicoSemEquipamento = require('../../controllers/unidade/servicoSemEquipamento');

route.get('/impressaounidade/:id',  servicoSemEquipamento.impressao);

//pagina de servico sem equipamento
route.get('/listagemunidade/:id',  servicoSemEquipamento.listagem);
route.post('/registro/servicoUnidade',  servicoSemEquipamento.cadastroDeServicoPost);
route.post('/registro/edit/servicoUnidade/:id',  servicoSemEquipamento.editServicoCadastro);
route.delete('/listagemunidade/delete/:id',  servicoSemEquipamento.deleteServicoUm);

module.exports = route;