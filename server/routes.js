import clients from './api/clients/routes/index.js';

export default function routes(app) {
  app.use('/clients', clients);
}
