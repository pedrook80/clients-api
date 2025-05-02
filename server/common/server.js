import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import l from './logger.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import errorHandler from '../middlewares/error.handler.js';
import pool from './db.js'; 

const app = new Express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, 'api.yml'));

export default class ExpressServer {
  constructor() {
    this.checkDatabaseConnection();

    const root = path.normalize(`${__dirname}/../..`);
    
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
  }

  async checkDatabaseConnection() {
    try {
      const conn = await pool.getConnection();
      await conn.ping();
      l.info('Banco de dados conectado com sucesso!');
      conn.release();
    } catch (err) {
      l.error('Erro ao conectar com o banco de dados:', err.message);
      process.exit(1);
    }
  }

  router(routes) {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = (p) => () =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
