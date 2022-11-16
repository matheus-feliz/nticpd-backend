"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv').config();

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
const app = _express2.default.call(void 0, );

var _login = require('./routes/login'); var _login2 = _interopRequireDefault(_login);
var _computador = require('./routes/computadorRouter/computador'); var _computador2 = _interopRequireDefault(_computador);
var _unidade = require('./routes/unidadeRouter/unidade'); var _unidade2 = _interopRequireDefault(_unidade);
var _servicoComEquipamento = require('./routes/computadorRouter/servicoComEquipamento'); var _servicoComEquipamento2 = _interopRequireDefault(_servicoComEquipamento);
var _servicoSemEquipamento = require('./routes/unidadeRouter/servicoSemEquipamento'); var _servicoSemEquipamento2 = _interopRequireDefault(_servicoSemEquipamento);
var _relatorio = require('./routes/relatorio'); var _relatorio2 = _interopRequireDefault(_relatorio);

var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
//import csrf from 'csurf';
var _connectflash = require('connect-flash'); var _connectflash2 = _interopRequireDefault(_connectflash);
var _expresssession = require('express-session'); var _expresssession2 = _interopRequireDefault(_expresssession);
var _connectmongo = require('connect-mongo'); var _connectmongo2 = _interopRequireDefault(_connectmongo);
var _middleware = require('./middleware/middleware');

app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.json());

_mongoose2.default.connect(process.env.CONNECTSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('conectado a base de dados');
        app.emit('pronto');
    }).catch(e => console.log(e));

const sessionOpition = _expresssession2.default.call(void 0, {
    secret: 'dljalçkdjaçkldjalkjdçaljlçaipoipçlçkh',
    store: new (0, _connectmongo2.default)({ mongoUrl: process.env.CONNECTSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOpition);
app.use(_connectflash2.default.call(void 0, ));
app.use(_helmet2.default.call(void 0, ));
//app.use(csrf());

//middleware
app.use(_middleware.meuMiddleware);
app.use(_cors2.default.call(void 0, ));
//app.use(csrfMiddleware);

//rotas
app.use(_login2.default);
app.use(_computador2.default);
app.use(_unidade2.default);
app.use(_servicoComEquipamento2.default);
app.use(_servicoSemEquipamento2.default);
app.use(_relatorio2.default);

module.exports = app;
