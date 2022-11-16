"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
const route = _express2.default.Router();
var _relatorioController = require('../controllers/relatorioController'); var _relatorioController2 = _interopRequireDefault(_relatorioController);

route.post('/relatorioBanco',  _relatorioController2.default.relatorioBanco);
module.exports = route;