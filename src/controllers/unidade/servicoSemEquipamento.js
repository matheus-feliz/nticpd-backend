
const Unidade  = require('../../models/unidade/UnidadeModel');
const Servico  = require('../../models/unidade/ServicoSemEquipamentoModel');
const ServicoEquipamento = require('../../models/computador/ServicoComEquipamentoModel');

//serviço de unidade daqui para baixo
exports.listagem = async function (req, res) { // listagem de unidade
    try {
        if (!req.params.id) return res.status('404');
        let unidade = await Unidade.buscaId(req.params.id)
        if (!unidade) {
            let servicoID = await Servico.buscaPorId(req.params.id)
            unidade = await Unidade.buscaListagem(servicoID.unidade)
            if (!unidade) return res.json(null);
        };
       let servicos = await Servico.buscaListagem(unidade.unidade);
        res.json({unidade, servicos});

    } catch (e) {
        res.status('404');
    }
}

exports.cadastroDeServicoPost = async function (req, res) { // post cadstro de servico  de unidade
   try {
        const servicoUnidade = await Servico.busca();
        const servicoEquipamento = await ServicoEquipamento.busca();
        let numeroDeServico = servicoUnidade.length + servicoEquipamento.length + 1;
        const servico = new Servico(req.body, numeroDeServico.toString());
        await servico.register();
        if (servico.errors.length > 0) {
            req.session.save(async function () {
                const unidade = await Unidade.buscaListagem(req.body.unidade);
                if (!unidade) return res.json(null);
                res.json(servico.errors);
                return;
            });
            return;
        }
        req.session.save(function () {
            res.json(servico.servico);
            return;
        })
    } catch (e) {
        res.status('404');
    }
}

exports.editServicoCadastro = async function (req, res) { // post edit de servico  de unidade
    try {
        const servico = new Servico(req.body);
        await servico.edit(req.params.id);
        if (servico.errors.length > 0) {
            req.session.save(async function () {
                //const editServico = await Servico.buscaPorId(req.params.id);
                return res.json(servico.errors);
            });
            return;
        }
        req.session.save(function () {
            res.json(servico.servico);
            return;
        });
    } catch (e) {
        res.status('404');
    }
}
exports.deleteServicoUm = async function (req, res) { // delete de servico  de unidade
  try {
        if (!req.params.id) return res.status('404');
        const unidadeServico = await Servico.buscaPorId(req.params.id);
        //const unidade = await Unidade.buscaListagem(unidadeServico.unidade);
        const servico = await Servico.deleteOne(req.params.id);
        if (!servico) return res.json(null);
        req.session.save(function () {
            res.json('deletado com sucesso');
            return;
        });
    } catch (e) {
        res.status('404');
    }
}

exports.impressao = async function (req, res) { // impressão de servico  de unidade
 try {
        if (!req.params.id) return res.status('404');
        const impressao = await Servico.buscaPorId(req.params.id);
        if (!impressao) res.json(null);
        res.json(impressao);

    } catch (e) {
        res.json('404');
    }
}