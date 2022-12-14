const express =require('express');
const route = express.Router();
const loginController= require('../controllers/loginController');

route.get('/',(req,res)=>{return res.json(null);})
route.post('/cadastro', loginController.register);
route.post('/login', loginController.login);
route.get('/logout', loginController.logout);
route.post('/esqueceusenha', loginController.esqueceu);
route.post('/registersenha/edit/:id', loginController.senhaEdit);

module.exports= route;