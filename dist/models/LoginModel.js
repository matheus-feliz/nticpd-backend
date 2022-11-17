"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _validator = require('validator'); var _validator2 = _interopRequireDefault(_validator);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

const LoginSchema = new _mongoose2.default.Schema({//dados
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true
    }

});


const LoginModel = _mongoose2.default.model('Login', LoginSchema);//conexão

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {//faz login
        //se o email for valido compara com o banco
        try {
            this.user = await LoginModel.findOne({ email: this.body.email });
            if (!this.user) {
                this.errors.push('usuário não existe')
                return;
            }

            if (!_bcryptjs2.default.compareSync(this.body.password, this.user.password)) {
                this.errors.push('senha invalida');
                this.user = null;
                return;
            }
        } catch (e) {
            console.log(e);
        }

    }
    async register() {//faz cadrasto
        try {
            this.validacao();
            await this.userExistem();
            if (this.errors.length > 0) {
                return;
            }
            await this.create();
        } catch (e) {
            console.log(e);
        }

    }
    validacao() {
        //garente o tipo string
        this.limpaBody();
        //valida email
        if (!_validator2.default.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        //valida se a senha é iqual
        if (this.body.password !== this.body.password2) this.errors.push('senha não são iquais');
    }

    async userExistem() {//pesquisa se existem email antes de cadastra
        const user = await LoginModel.findOne({ email: this.body.email });
        if (user) {
            this.errors.push('outro usuario já usa esse email');
            return;
        }
    }
    async create() {//cria o cadastro no banco
        const salt = _bcryptjs2.default.genSaltSync();
        this.body.password = _bcryptjs2.default.hashSync(this.body.password, salt);
        this.body.password2 = _bcryptjs2.default.hashSync(this.body.password2, salt);
        this.user = await LoginModel.create(this.body);

    }
    async esqueceuSenha() {// pesquisa o email para trocar a senha
        const user = await LoginModel.findOne({ email: this.body.email });
        if (!user) {
            this.errors.push('email Não existe no banco de dados');
            return;
        }
        return user;
    }
    async edit(id) {//update da senha
        if (typeof id !== "string") return;
        this.validacao();
        if (this.errors.length > 0) {
            return
        };
        const user = await this.buscaPorIdNoStatic(id);
        this.body.email = user.email;
        const salt = _bcryptjs2.default.genSaltSync();
        this.body.password = _bcryptjs2.default.hashSync(this.body.password, salt);
        this.body.password2 = _bcryptjs2.default.hashSync(this.body.password2, salt);
        this.user = await LoginModel.findByIdAndUpdate(id, this.body, { new: true });
    }
    async buscaPorIdNoStatic(id) {//busca id
        if (typeof id !== "string") return;
        const user = await LoginModel.findById(id);
        return user;
    }
    static async buscaPorId(id) {//busca id
        if (typeof id !== "string") return;
        const user = await LoginModel.findById(id);
        return user;
    }
    limpaBody() {//garente que é string
        for (const index in this.body) {
            if (typeof this.body[index] !== 'string') {
                this.body[index] = '';
            }
        }
        this.body = {
            nome: this.body.nome,
            email: this.body.email,
            password: this.body.password,
            password2: this.body.password2
        }

    }

};

module.exports = Login;