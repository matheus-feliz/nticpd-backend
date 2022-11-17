require('dotenv').config();

import express from 'express';
const app = express();

import routeLogin from './routes/login';
import routeComputador  from './routes/computadorRouter/computador';
import routeUnidade from './routes/unidadeRouter/unidade';
import routeServicoComEquipamento  from './routes/computadorRouter/servicoComEquipamento';
import routeServicoSemEquipamento  from './routes/unidadeRouter/servicoSemEquipamento';
import routeRelatorio from'./routes/relatorio';

import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
//import csrf from 'csurf';
import flash from 'connect-flash';
import session from'express-session';
import MongoStore from'connect-mongo';
import { meuMiddleware, csrfMiddleware } from './middleware/middleware';

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
