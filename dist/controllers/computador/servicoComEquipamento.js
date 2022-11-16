"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _PcModel = require('../../models/computador/PcModel'); var _PcModel2 = _interopRequireDefault(_PcModel);
var _ServicoComEquipamentoModel = require('../../models/computador/ServicoComEquipamentoModel'); var _ServicoComEquipamentoModel2 = _interopRequireDefault(_ServicoComEquipamentoModel);
var _ServicoSemEquipamentoModel = require('../../models/unidade/ServicoSemEquipamentoModel'); var _ServicoSemEquipamentoModel2 = _interopRequireDefault(_ServicoSemEquipamentoModel);

    //servico com equipamento daqui para baixo
exports.listagem = async function(req, res) { // listagem de servico
    try {
        if (!req.params.id) return res.status('404');
        let equipamento = await _PcModel2.default.buscaPorId(req.params.id);
        if (!equipamento) {
            let servicoID = await _ServicoComEquipamentoModel2.default.buscaPorId(req.params.id);
            equipamento = await _PcModel2.default.buscaListagem(servicoID.tombo);
            if (!equipamento) return res.json(null);
        };
       let servicos = await _ServicoComEquipamentoModel2.default.buscaListagem(equipamento.tombo);
        res.json({equipamento, servicos});

    } catch (e) {
        res.status('404');
    }
}

exports.cadastroDeServicoPost = async function(req, res) { // post cadastro de servico com equipamento
    try {
        const servicoUnidade = await _ServicoSemEquipamentoModel2.default.busca();
        const servicoEquipamento = await _ServicoComEquipamentoModel2.default.busca();
        let numeroDeServico = servicoUnidade.length + servicoEquipamento.length + 1;
        const servico = new (0, _ServicoComEquipamentoModel2.default)(req.body, numeroDeServico);
        await servico.register();
        if (servico.errors.length > 0) {
            req.session.save(async function() {
                const equipamento = await _PcModel2.default.buscaListagem(req.body.tombo);
                if (!equipamento) return res.json(null);
                res.json(servico.errors);
                return;
            });
            return;
        }
        req.session.save(function() {
            res.json(servico.servico);
            return;
        })
    } catch (e) {
        res.status('404');
    }
    
}
exports.editServicoCadastro = async function(req, res) { // post edit de servico 
    try {
        const servico = new (0, _ServicoComEquipamentoModel2.default)(req.body);
        await servico.edit(req.params.id);
        console.log(servico.errors)
        if (servico.errors.length > 0) {
            req.session.save(async function() {
                //const editServico = await Servico.buscaPorId(req.params.id);
                return res.json( servico.errors);
            });
            return;
        }
        req.flash('success', 'edição efetuado com sucesso');
        req.session.save(function() {
            res.json(servico.servico);
            return;
        });
    } catch (e) {
        res.status('404')
    }
}

exports.deleteServicoUm = async function(req, res) { // delete de servico 
    try {
        if (!req.params.id) return res.status('404');
        const equipamentoServico = await _ServicoComEquipamentoModel2.default.buscaPorId(req.params.id);
       //const equipamento = await Pc.buscaListagem(equipamentoServico.tombo);
        const servico = await _ServicoComEquipamentoModel2.default.deleteOne(req.params.id);
        if (!servico) return res.json(null);
        req.flash('success', 'servico deletato com sucesso');
        req.session.save(function() {
            res.json(`deletado com sucesso`);
            return;
        });
    } catch (e) {
        res.status('404');
    }
}

exports.impressao = async function(req, res) { // impressão de servico com equipamento
    try {
        if (!req.params.id) return res.status('404');
        const servico = await _ServicoComEquipamentoModel2.default.buscaPorId(req.params.id);
        if (!servico) res.json(null);
        res.json( servico );

    } catch (e) {
        res.status('404');
    }
}