import clients from './api/clients/routes/index.js';
import user from './api/user/routes/index.js';

export default function routes(app) {
  app.use('/clients', clients);
  app.use('/user', user);
}
