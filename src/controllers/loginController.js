
const Login = require('../models/LoginModel');

exports.login = async function (req, res) {//faz login
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.json(login.errors);
            });
            return;
        }
        req.flash('success', 'login efetuado com sucesso');
        req.session.user = login.user;
        req.session.save(function () {
          return res.json(login.user);
        });
    } catch (e) {
        return res.render('404');
    }

}
//sair do login
exports.logout = function (req, res) {
    req.session.destroy();
    res.json('deslogado');

}

//falta implementar o cadastro aqui
exports.register = async function (req, res) {
   try {
        const register = new Login(req.body);

        await register.register();
        if (register.errors.length > 0) {
            req.session.save(function () {
                return res.json(register.errors);
            });
            return;
        }

        req.flash('success', 'cadastro realizado')
        req.session.save(function () {
            return res.json(register.user);
        });

    } catch (e) {
        return res.status('404');
    }
}

exports.esqueceu = async function (req, res) {//busca pelo id
   if (typeof req.body.email !== 'string') return;
    const user = new Login(req.body);
    const senha = await user.esqueceuSenha();

    if (user.errors.length > 0) {
        req.flash('errors', user.errors);
        req.session.save(function () {
            return res.json(user.errors);
        });
        return;
    }
    return res.json(senha);
}
exports.senhaEdit = async function (req, res) {//update da senha
  if (!req.params.id) res.render('404');
    const user = new Login(req.body);
   await user.edit(req.params.id);
    if (user.errors.length > 0) {
        req.flash('errors', user.errors);
        req.session.save(async function () {
           res.json(user.errors)
            return;
        });
        return;
    }
    req.flash('success', 'edição efetuado com sucesso');
    req.session.save(function () {
        res.json(`sucesso`);
        return;
    })
}
