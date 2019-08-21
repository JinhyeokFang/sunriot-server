import express from 'express';
import logger from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import config from './config';

import db from './db';

import IndexRoute from './inputs/index.route';
import AuthRoute from './inputs/auth.route';
import RoomRoute from './inputs/room.route';

const app: express.Application = express();

db.initialize();

app.use(logger(config.env));
app.use(compression());
app.use(helmet());
app.disable('x-powered-by');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(config.staticDir));

app.use('/', IndexRoute);
app.use('/auth', AuthRoute);
app.use('/room', RoomRoute);

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(config.port, (): void => console.log(`Listening at http://localhost:${config.port}/`));