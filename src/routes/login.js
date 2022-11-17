import express from 'express';
const route = express.Router();
import loginController from '../controllers/loginController';

route.post('/cadastro', loginController.register);
route.post('/login', loginController.login);
route.get('/logout', loginController.logout);
route.post('/esqueceusenha', loginController.esqueceu);
route.post('/registersenha/edit/:id', loginController.senhaEdit);

module.exports= route;