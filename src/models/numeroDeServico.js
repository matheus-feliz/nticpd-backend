const mongoose = require('mongoose');

const numero = new mongoose.Schema({//dados
    numero: {
        type: Number,
        required: true
    }

});

const numeroDeServicoModel = mongoose.model('numeroDeServico', numero);//conexão

class NumeroDeServico {
    constructor(numero) {
        this.body= numero + 1;
        this.numero = null;
    }

    async register(){
        this.numero = await numeroDeServicoModel.create(this.body)
    }
    static async busca(){
        const numero = await numeroDeServicoModel.find();
        return numero;
    } 
    async edit(id) { //edit de dados
        console.log('id: ',id);
        if (typeof id !== "string")  { return};
        this.numero = await numeroDeServicoModel.findByIdAndUpdate(id, this.body, { new: true });    
        console.log('numero: ', this.numero)    
    }
}

module.exports = NumeroDeServico;