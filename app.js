require('dotenv').config();

const express = require('express');
const app = express();

const routeLogin = require('./src/routes/login');
const routeComputador = require('./src/routes/computadorRouter/computador');
const routeUnidade = require('./src/routes/unidadeRouter/unidade');
const routeServicoComEquipamento = require('./src/routes/computadorRouter/servicoComEquipamento');
const routeServicoSemEquipamento = require('./src/routes/unidadeRouter/servicoSemEquipamento');
const routeRelatorio = require('./src/routes/relatorio');

const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
//const csrf = require('csurf');
const flash = require('connect-flash');
const session =require('express-session');
const MongoStore =require('connect-mongo');
const { meuMiddleware, csrfMiddleware } =require('./src/middleware/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.CONNECTSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('conectado a base de dados');
        app.emit('pronto');
    }).catch(e => console.log(e));

const sessionOpition = session({
    secret: 'dljalçkdjaçkldjalkjdçaljlçaipoipçlçkh',
    store: new MongoStore({ mongoUrl: process.env.CONNECTSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOpition);
app.use(flash());
app.use(helmet());
//app.use(csrf());

//middleware
app.use(meuMiddleware);
app.use(cors());
//app.use(csrfMiddleware);

//rotas
app.use(routeLogin);
app.use(routeComputador);
app.use(routeUnidade);
app.use(routeServicoComEquipamento);
app.use(routeServicoSemEquipamento);
app.use(routeRelatorio);

module.exports = app;
