"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const EquipamentoSchema = new _mongoose2.default.Schema({ //dados
    telefone: {
        type: String,
        required: true
    },
    unidade: {
        type: String,
        required: true
    },
    responsavel: {
        type: String,
        required: true
    },
    tombo: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    backup: {
        type: String,
        required: true
    },
    dataInicial: {
        type: String,
        required: true
    },
    dataFinal: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    solucao: {
        type: String,
        required: false
    },
    observacao: {
        type: String,
        required: false
    },
    criadoEm: { type: Date, default: Date.now }
});

const EquipamentoMOdel = _mongoose2.default.model('servicoComEquipamento', EquipamentoSchema); //conexão com o banco

class servicoComEquipamento {
    constructor(body, numero) {
        this.body = body;
        this.body.numero = numero;
        this.errors = [];
        this.servico = null;
    }

    async register() { //cadastro
        this.limpaBody();
        this.validacao();
        await this.create();
    }

    async create() { //registra no banco de dados
        if (this.errors.length > 0) {
            return;
        }
        this.servico = await EquipamentoMOdel.create(this.body);
    }

    limpaBody() { // garante que é uma string
        for (const index in this.body) {
            if (typeof this.body[index] !== 'string') {
                this.body[index] = '';
            }
        }
        this.body = {
            telefone: this.body.telefone,
            unidade: this.body.unidade.toUpperCase(),
            responsavel: this.body.responsavel.toUpperCase(),
            tombo: this.body.tombo,
            tipo: this.body.tipo,
            backup: this.body.backup.toUpperCase(),
            dataInicial: this.body.dataInicial,
            dataFinal: this.body.dataFinal,
            numero: this.body.numero,
            solucao: this.body.solucao.toUpperCase(),
            observacao: this.body.observacao.toUpperCase()
        }

    }

    validacao() { //valida os dados
        let dataInicialDia = this.body.dataInicial.slice(0, 2);
        let dataInicialMes = this.body.dataInicial.slice(3, 5);
        let dataInicialAno = this.body.dataInicial.slice(6, 10);
        let dataFinalDia = this.body.dataFinal.slice(0, 2);
        let dataFinalMes = this.body.dataFinal.slice(3, 5);
        let dataFinalAno = this.body.dataFinal.slice(6, 10);
        if (!this.body.telefone) { this.errors.push('telefone é obrigatorio') };
        if (!this.body.unidade) { this.errors.push('unidade é obrigatorio') };
        if (!this.body.responsavel) { this.errors.push('responsavel é obrigatorio') };
        if (!this.body.tombo) { this.errors.push('tombo é obrigatorio') };
        if (!this.body.tipo) { this.errors.push('tipo é obrigatorio') };
        if (!this.body.backup) { this.errors.push('backup é obrigatorio') };
        if (!this.body.dataInicial) { this.errors.push('data inicial é obrigatorio') };
        if (!this.body.dataFinal) { this.errors.push('data final é obrigatorio') };
        if(dataInicialDia > dataFinalDia|| dataInicialMes > dataFinalMes || dataInicialAno > dataFinalAno){
                this.errors.push('data inicial maior que a final');
        }
           
    
    }

    static async busca() { // busca
        const servicos = await EquipamentoMOdel.find();
        return servicos;
    }
    static async buscaPorData(dataInicial, dataFinal) { //busca relatorio
        if (typeof dataInicial !== "string" && typeof dataFinal !== 'string') return;
        const servicos = await EquipamentoMOdel.find({
            dataInicial: { "$gte": dataInicial },
            dataFinal: { "$lte": dataFinal }
        }).sort({
            criadoEm: -1,
        });
        let dataInicialMes = dataInicial.slice(3, 5);
        let dataFinalMes = dataFinal.slice(3, 5);
        for (let i = 0; i <= 1; i++) {
            this.verficarRelatorio(dataInicialMes, dataFinalMes, servicos)
        }
        return servicos;
    }
    static verficarRelatorio(dataInicialMes, dataFinalMes, servicos) {
        for (let i = 0; i < servicos.length; i++) {
            if (typeof servicos[i].dataInicial === "string" && typeof servicos[i].dataFinal === "string") {
                if (servicos[i].dataInicial.slice(3, 5) !== dataInicialMes && servicos[i].dataFinal.slice(3, 5) !== dataFinalMes) {
                    servicos.splice(i, 1);
                    if (i > 0) {
                        i--;
                    }
                }
            }
        }
    }
    static async buscaListagem(tombo) { // busca listagem
        if (typeof tombo !== "string") return;
        const servicos = await EquipamentoMOdel.find({
            tombo: tombo
        }).sort({
            criadoEm: -1,
        });
        return servicos;
    }

    static async buscaPorId(id) { // busca por id
        if (typeof id !== "string") return;
        const servico = await EquipamentoMOdel.findById(id);
        return servico;
    }

    async edit(id) { //edit de dados
        if (typeof id !== "string") return;
        this.limpaBody();
        this.validacao();
        if (this.errors.length > 0){
            return;
        };
        this.servico = await EquipamentoMOdel.findByIdAndUpdate(id, this.body, { new: true });        
    }

    static async deleteOne(id) { //deleta um dado
        if (typeof id !== "string") return;
        const servico = await EquipamentoMOdel.findByIdAndDelete(id);
        return servico;
    }
}

module.exports = servicoComEquipamento;