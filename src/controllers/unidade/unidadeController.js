
const Unidade = require('../../models/unidade/UnidadeModel');

exports.cadastro = async function (req, res) { // post cadastro de unidade
    try {
        const unidade = new Unidade(req.body);
        await unidade.register();

        if (unidade.errors.length > 0) {
            req.session.save(function () {
                return res.json(unidade.errors);
            });
            return;
        }
        req.flash('success', 'cadastro efetuado com sucesso');
        req.session.save(function () {
            res.json(unidade.unidade);
            return;
        })
    } catch (e) {
        res.status('404')
    }
}

exports.buscaRetorno = async function (req, res) { // busca de unidade com retorno do banco
  const unidades = await Unidade.buscaUnidades();
    if (!unidades) {
        req.session.save(async function () {
            res.json('unidade não existe');
            return;
        });
        return;
    };
    res.json( unidades );    
}

exports.edit = async function (req, res) { // post edit de unidade
    try {
        const unidade = new Unidade(req.body);
        await unidade.edit(req.params.id);

        if (unidade.errors.length > 0) {
            req.session.save(async function () {
                //const unidade = await unidade.buscaId(req.params.id);
                res.json(unidade.errors);
                return;
            });
            return;
        }

        req.session.save(function () {
            res.json(unidade.unidade);
            return;
        })
    }
    catch (e) {
        res.status('404')
    }
}
exports.delete = async function (req, res) { // delete de unidade
  try {
        if (!req.params.id) res.status('404');
        const unidade = await Unidade.delete(req.params.id);
        if (!unidade) res.json(null);
        req.session.save(function () {
            res.json(`deletado com sucesso`);
            return;
        });
    } catch (e) {
        res.status('404');
    }
}
