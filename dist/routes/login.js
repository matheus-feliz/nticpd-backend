"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
const route = _express2.default.Router();
var _loginController = require('../controllers/loginController'); var _loginController2 = _interopRequireDefault(_loginController);

route.post('/cadastro', _loginController2.default.register);
route.post('/login', _loginController2.default.login);
route.get('/logout', _loginController2.default.logout);
route.post('/esqueceusenha', _loginController2.default.esqueceu);
route.post('/registersenha/edit/:id', _loginController2.default.senhaEdit);

module.exports= route;