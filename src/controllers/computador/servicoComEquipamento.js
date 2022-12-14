const Pc = require( '../../models/computador/PcModel');
const Servico  = require( '../../models/computador/ServicoComEquipamentoModel');
const ServicoUnidade = require('../../models/unidade/ServicoSemEquipamentoModel')
//const NumeroDeServico = require('../../models/numeroDeServico')

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

exports.cadastroDeServico = async function(req, res){
    try {
        console.log('entrou aqui')
       /* let numero = await NumeroDeServico.busca();
        let inteiro = numero[0].numero;
        let numeroDeServico = new NumeroDeServico(inteiro);
        await numeroDeServico.edit("63962f8d67743fd6fe8608d3");
        console.log('entrou aqui@', numeroDeServico.numero)*/
        const servicoUnidade = await Servico.busca();
        const servicoEquipamento = await ServicoUnidade.busca();
        let numeroDeServico = servicoUnidade.length +  servicoEquipamento.length + 1
        console.log(numeroDeServico)
        const servico = new Servico(req.body,numeroDeServico);
        await servico.register();
             
        if (servico.errors.length > 0) {
            req.session.save(async function() {
                res.json(servico.errors);
                return;
            });
        }
        req.session.save(function() {
            console.log('saiu aqui')
            res.json(servico.servico)
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