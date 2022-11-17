import Pc from '../../models/computador/PcModel';
import Servico  from '../../models/computador/ServicoComEquipamentoModel';
import ServicoUnidade from '../../models/unidade/ServicoSemEquipamentoModel';

    //servico com equipamento daqui para baixo
exports.listagem = async function(req, res) { // listagem de servico
    try {
        if (!req.params.id) return res.status('404');
        let equipamento = await Pc.buscaPorId(req.params.id);
        if (!equipamento) {
            let servicoID = await Servico.buscaPorId(req.params.id);
            equipamento = await Pc.buscaListagem(servicoID.tombo);
            if (!equipamento) return res.json(null);
        };
       let servicos = await Servico.buscaListagem(equipamento.tombo);
        res.json({equipamento, servicos});

    } catch (e) {
        res.status('404');
    }
}

exports.cadastroDeServicoPost = async function(req, res) { // post cadastro de servico com equipamento
    try {
        const servicoUnidade = await ServicoUnidade.busca();
        const servicoEquipamento = await Servico.busca();
        let numeroDeServico = servicoUnidade.length + servicoEquipamento.length + 1;
        const servico = new Servico(req.body, numeroDeServico);
        await servico.register();
        if (servico.errors.length > 0) {
            req.session.save(async function() {
                const equipamento = await Pc.buscaListagem(req.body.tombo);
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
        const servico = new Servico(req.body);
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
        const equipamentoServico = await Servico.buscaPorId(req.params.id);
       //const equipamento = await Pc.buscaListagem(equipamentoServico.tombo);
        const servico = await Servico.deleteOne(req.params.id);
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
        const servico = await Servico.buscaPorId(req.params.id);
        if (!servico) res.json(null);
        res.json( servico );

    } catch (e) {
        res.status('404');
    }
}