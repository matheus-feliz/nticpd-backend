import express from 'express';
const route = express.Router();
import servicoComEquipamento from '../../controllers/computador/servicoComEquipamento';

//pagina de servico com equipamento
route.get('/listagemcomputador/:id',  servicoComEquipamento.listagem);
route.post('/registro/servico',  servicoComEquipamento.cadastroDeServicoPost);
route.post('/registro/edit/servico/:id',  servicoComEquipamento.editServicoCadastro);
route.delete('/listagemcomputador/delete/:id',  servicoComEquipamento.deleteServicoUm);

//impressao
route.get('/impressao/:id',  servicoComEquipamento.impressao);

module.exports = route;