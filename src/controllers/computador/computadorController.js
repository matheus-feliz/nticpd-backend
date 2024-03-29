const Pc =require('../../models/computador/PcModel');

exports.cadastro = async function(req, res) { // post cadastro de equipamento
    try {
        const pc = new Pc(req.body);
        await pc.register();
        console.log('entrou no cadastro')
        if (pc.errors.length > 0) {
            req.session.save(function() {
                 res.json(pc.errors);
                 return
            });
            return;
        }

        req.session.save(function() {
            console.log('saiu')
           res.json(pc.equipamento);
            return;
        })

    } catch (e) {
        return res.status('404');
    }
}

exports.editEquipamentoPost = async function(req, res) { // post edit de servico 
    try {
        const pc = new Pc(req.body);
        await pc.edit(req.params.id);
        if (pc.errors.length > 0) {
            req.session.save(async function() {
                return res.json(pc.errors);
            });
            return;
        }
        req.session.save( async function() {
            res.json(pc.equipamento);
            return;
        });
    } catch (e) {
        res.render('404');
    }
}


exports.buscaRetorno = async function(req, res) { //busca com redorno do banco
    const equipamentos = await Pc.buscaEquipamentos();
    if (equipamentos.length === 0) {
        req.session.save(async function() {
          res.json('equipamento não existe');
            return;
        });
        return;
    };
    res.json(
        equipamentos
    );

}
exports.delete = async function(req, res) { // delete de equipamento
      try {
            if (!req.params.id) return res.status('404');
            const equipamento = await Pc.delete(req.params.id);
            if (!equipamento) return res.json(null);
            req.flash('success', 'cadastro deletato com sucesso');
            req.session.save(function() {
                res.json(`deletado com sucesso`);
                return;
            });
        } catch (e) {
            res.status('404');
        }
    }